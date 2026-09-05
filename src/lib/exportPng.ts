import { toPng } from "html-to-image";

export async function exportNodeToPng(node: HTMLElement, filename: string) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#FFFFFF",
    // inline fonts for crisp export
    fontEmbedCSS: undefined,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
