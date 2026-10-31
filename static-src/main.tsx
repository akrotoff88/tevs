import { hydrateRoot } from "react-dom/client";
import "../app/globals.css";
import "../app/services.css";
import Home, { type Lang } from "../app/page";

const lang: Lang = document.documentElement.lang === "kk" ? "kk" : "ru";

hydrateRoot(document.getElementById("root")!, <Home lang={lang} />);
