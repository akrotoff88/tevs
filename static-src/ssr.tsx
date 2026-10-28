import { renderToString } from "react-dom/server";
import Home, { type Lang } from "../app/page";

export function render(lang: Lang) {
  return renderToString(<Home lang={lang} />);
}
