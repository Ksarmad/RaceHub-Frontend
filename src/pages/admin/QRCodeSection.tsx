import { QRCodeSVG } from "qrcode.react";

function QRCodeSection() {
  const registrationUrl = `${import.meta.env.VITE_FRONTEND_PRODURL}/register`;

  const handleDownload = () => {
    const svg = document.getElementById("registration-qr");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new Image();

    canvas.width = 300;
    canvas.height = 300;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");

      downloadLink.download = "registration-qr.png";

      downloadLink.href = pngFile;

      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div
      className="
        mb-6
        rounded-3xl
        border
        border-red-500/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-6
        "
      >
        <div className="text-center">
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Registration QR
          </h2>

          <p className="mt-2 text-zinc-400">
            Students can scan this QR to register
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-white
            p-4
          "
        >
          <QRCodeSVG id="registration-qr" value={registrationUrl} size={220} />
        </div>

        <button
          onClick={handleDownload}
          className="
            rounded-xl
            bg-red-600
            px-5
            py-3
            font-medium
            transition-all

            hover:bg-red-500
          "
        >
          Download QR
        </button>
        <div
          className="
    text-center
    text-sm
    text-zinc-400
  "
        >
          Scan using mobile camera to access registration page
        </div>

        <div
          className="
            max-w-md
            break-all
            text-center
            text-sm
            text-zinc-500
          "
        >
          {registrationUrl}
        </div>
      </div>
    </div>
  );
}

export default QRCodeSection;
