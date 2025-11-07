// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // obtener sesión actual
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    // escuchar cambios (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Cargando...
      </div>
    );
  }

  if (!session) {
    // no hay sesión, redirigir a login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // hay sesión → renderiza lo que sea
  return children;
}