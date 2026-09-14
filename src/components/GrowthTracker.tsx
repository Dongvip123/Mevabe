"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createClient } from "@/lib/supabase/client";

type GrowthRecord = {
  id: string;
  date: string;
  weightKg: number | null;
  heightCm: number | null;
  headCm: number | null;
};

type Baby = {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  growthRecords: GrowthRecord[];
};

function ageInMonths(birthDate: string, date: string) {
  const b = new Date(birthDate);
  const d = new Date(date);
  const months =
    (d.getFullYear() - b.getFullYear()) * 12 + (d.getMonth() - b.getMonth());
  return Math.max(0, months);
}

export default function GrowthTracker() {
  const supabase = createClient();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [loadingBaby, setLoadingBaby] = useState(false);
  const [babies, setBabies] = useState<Baby[]>([]);

  // Form tạo hồ sơ bé
  const [babyName, setBabyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("female");
  const [creatingBaby, setCreatingBaby] = useState(false);

  // Form thêm lần đo
  const [recordDate, setRecordDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [addingRecord, setAddingRecord] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setCheckingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!userEmail) return;
    setLoadingBaby(true);
    fetch("/api/baby")
      .then((res) => res.json())
      .then((data) => setBabies(data.babies || []))
      .finally(() => setLoadingBaby(false));
  }, [userEmail]);

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/theo-doi-be`,
      },
    });
    setSending(false);
    if (error) setError("Không gửi được link, thử lại sau nhé.");
    else setLinkSent(true);
  }

  async function handleCreateBaby(e: React.FormEvent) {
    e.preventDefault();
    if (!babyName.trim() || !birthDate) return;
    setCreatingBaby(true);
    setError("");

    const res = await fetch("/api/baby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: babyName, birthDate, gender }),
    });

    setCreatingBaby(false);

    if (!res.ok) {
      setError("Tạo hồ sơ không thành công, thử lại nhé.");
      return;
    }

    const newBaby = await res.json();
    setBabies((prev) => [...prev, { ...newBaby, growthRecords: [] }]);
  }

  async function handleAddRecord(babyId: string, e: React.FormEvent) {
    e.preventDefault();
    if (!weight && !height) return;
    setAddingRecord(true);
    setError("");

    const res = await fetch("/api/growth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        babyId,
        date: recordDate,
        weightKg: weight ? parseFloat(weight) : undefined,
        heightCm: height ? parseFloat(height) : undefined,
      }),
    });

    setAddingRecord(false);

    if (!res.ok) {
      setError("Lưu số đo không thành công, thử lại nhé.");
      return;
    }

    const newRecord = await res.json();
    setBabies((prev) =>
      prev.map((b) =>
        b.id === babyId
          ? {
              ...b,
              growthRecords: [...b.growthRecords, newRecord].sort(
                (a, c) => new Date(a.date).getTime() - new Date(c.date).getTime()
              ),
            }
          : b
      )
    );
    setWeight("");
    setHeight("");
  }

  if (checkingAuth) {
    return <p className="text-sm text-ink-soft">Đang kiểm tra đăng nhập...</p>;
  }

  if (!userEmail) {
    return (
      <div className="bg-paper border border-line rounded-sm p-5">
        {!linkSent ? (
          <form onSubmit={handleSendMagicLink} className="flex flex-col gap-3">
            <p className="text-sm text-ink-soft">
              Đăng nhập bằng email để bắt đầu theo dõi bé — dữ liệu chỉ mình
              bạn xem được.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                className="flex-1 border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-forest text-cream px-4 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
              >
                {sending ? "Đang gửi..." : "Gửi link đăng nhập"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-forest">
            Đã gửi link đăng nhập tới <strong>{email}</strong>. Mở email và
            bấm vào link để quay lại đây nhé.
          </p>
        )}
      </div>
    );
  }

  const baby = babies[0];

  return (
    <div>
      {error && <p className="text-sm text-clay mb-4">{error}</p>}

      {loadingBaby && (
        <p className="text-sm text-ink-soft">Đang tải hồ sơ bé...</p>
      )}

      {!loadingBaby && !baby && (
        <form
          onSubmit={handleCreateBaby}
          className="bg-paper border border-line rounded-sm p-5 flex flex-col gap-3"
        >
          <p className="text-sm text-ink-soft mb-1">
            Chưa có hồ sơ bé nào — tạo một hồ sơ để bắt đầu theo dõi.
          </p>
          <input
            type="text"
            required
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            placeholder="Tên bé"
            className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
          />
          <div className="flex gap-3">
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1 border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
            >
              <option value="female">Bé gái</option>
              <option value="male">Bé trai</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={creatingBaby}
            className="self-start bg-forest text-cream px-4 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
          >
            {creatingBaby ? "Đang tạo..." : "Tạo hồ sơ bé"}
          </button>
        </form>
      )}

      {baby && (
        <div>
          <div className="mb-8">
            <h2 className="font-serif-display text-xl text-forest">
              {baby.name}
            </h2>
            <p className="text-sm text-ink-soft">
              Sinh ngày {new Date(baby.birthDate).toLocaleDateString("vi-VN")}{" "}
              · {baby.gender === "male" ? "Bé trai" : "Bé gái"}
            </p>
          </div>

          {baby.growthRecords.length >= 2 && (
            <div className="mb-10 grid sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium text-ink mb-2">
                  Cân nặng (kg) theo tháng tuổi
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={baby.growthRecords
                      .filter((r) => r.weightKg != null)
                      .map((r) => ({
                        month: ageInMonths(baby.birthDate, r.date),
                        value: r.weightKg,
                      }))}
                  >
                    <CartesianGrid stroke="#ddd4bf" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} unit="th" />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#24402f"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-sm font-medium text-ink mb-2">
                  Chiều cao (cm) theo tháng tuổi
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={baby.growthRecords
                      .filter((r) => r.heightCm != null)
                      .map((r) => ({
                        month: ageInMonths(baby.birthDate, r.date),
                        value: r.heightCm,
                      }))}
                  >
                    <CartesianGrid stroke="#ddd4bf" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} unit="th" />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ce9e4a"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => handleAddRecord(baby.id, e)}
            className="bg-paper border border-line rounded-sm p-5 flex flex-col gap-3 mb-8"
          >
            <p className="text-sm font-medium text-ink">Thêm lần đo mới</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={recordDate}
                onChange={(e) => setRecordDate(e.target.value)}
                className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Cân nặng (kg)"
                className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Chiều cao (cm)"
                className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
              />
            </div>
            <button
              type="submit"
              disabled={addingRecord}
              className="self-start bg-forest text-cream px-4 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
            >
              {addingRecord ? "Đang lưu..." : "Lưu số đo"}
            </button>
          </form>

          {baby.growthRecords.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-soft border-b border-line">
                  <th className="py-2 font-normal">Ngày đo</th>
                  <th className="py-2 font-normal">Tháng tuổi</th>
                  <th className="py-2 font-normal">Cân nặng</th>
                  <th className="py-2 font-normal">Chiều cao</th>
                </tr>
              </thead>
              <tbody>
                {[...baby.growthRecords]
                  .reverse()
                  .map((r) => (
                    <tr key={r.id} className="border-b border-line/60">
                      <td className="py-2">
                        {new Date(r.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-2">
                        {ageInMonths(baby.birthDate, r.date)} tháng
                      </td>
                      <td className="py-2">
                        {r.weightKg != null ? `${r.weightKg} kg` : "—"}
                      </td>
                      <td className="py-2">
                        {r.heightCm != null ? `${r.heightCm} cm` : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
