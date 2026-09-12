import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Dùng trong Server Component / Route Handler để đọc phiên đăng nhập
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Bỏ qua nếu gọi từ Server Component không cho phép set cookie
          }
        },
      },
    }
  );
}
