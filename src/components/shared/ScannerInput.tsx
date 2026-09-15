import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ScannerInputProps {
  onScan: (barcode: string) => void;
}

// Handles two scan modes:
// 1. USB/Bluetooth barcode scanner - types into a keyboard-wedge input, ends with Enter
// 2. Phone/laptop camera - opens html5-qrcode modal for manual devices without a scanner
export function ScannerInput({ onScan }: ScannerInputProps) {
  const [value, setValue] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) {
      onScan(value.trim());
      setValue("");
    }
  }

  useEffect(() => {
    if (!cameraOpen) return;

    const scanner = new Html5Qrcode("camera-scan-region");
    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScan(decodedText);
          scanner.stop().then(() => setCameraOpen(false));
        },
        undefined
      )
      .catch(() => setCameraOpen(false));

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [cameraOpen, onScan]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          autoFocus
          placeholder="Scan barcode or type it here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" variant="secondary" onClick={() => setCameraOpen((v) => !v)}>
          {cameraOpen ? "Close camera" : "Use camera"}
        </Button>
      </div>
      {cameraOpen && <div id="camera-scan-region" className="mx-auto max-w-sm" />}
    </div>
  );
}
