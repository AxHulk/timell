import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoImg from "@/assets/logo-horizontal.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Заполните все поля"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error("Ошибка входа: " + error.message); return; }
    toast.success("Добро пожаловать!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <a href="/" className="mb-8"><img src={logoImg} alt="Timell" className="h-10" /></a>
      <div className="bg-card rounded-2xl shadow-sm border border-border p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 font-display">Вход в аккаунт</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Пароль</Label>
            <Input type="password" placeholder="Ваш пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Вход..." : "Войти"}</Button>
        </form>
        <p className="text-sm text-center text-muted-foreground mt-4">
          Нет аккаунта? <Link to="/register" className="text-primary underline">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
