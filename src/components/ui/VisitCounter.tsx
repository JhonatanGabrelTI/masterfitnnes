"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const VISITOR_KEY = "master_fitness_visitor_registered";

export default function VisitCounter() {
  const [count, setCount] = useState(200);
  const [isPersistent, setIsPersistent] = useState(false);
  useEffect(() => {
    const alreadyRegistered = localStorage.getItem(VISITOR_KEY) === "true";
    fetch("/api/visits", { method: alreadyRegistered ? "GET" : "POST", cache: "no-store" })
      .then((response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ count: number; persistent: boolean }>; })
      .then((data) => { setCount(Math.max(200, data.count)); setIsPersistent(data.persistent); if (!alreadyRegistered) localStorage.setItem(VISITOR_KEY, "true"); })
      .catch(() => setCount(200));
  }, []);
  return <div className="visitor-counter" aria-label={`${count.toLocaleString("pt-BR")} visitas ao site`}><span className="visitor-icon"><Eye className="h-5 w-5" /></span><span><small>Visitas ao site</small><strong>{count.toLocaleString("pt-BR")}</strong></span><i className={isPersistent ? "" : "is-preview"}><b /> {isPersistent ? "ao vivo" : "prévia"}</i></div>;
}
