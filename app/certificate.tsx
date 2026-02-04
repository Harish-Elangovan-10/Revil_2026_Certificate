"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const [name, setName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  
  const certificateRef = useRef<HTMLDivElement>(null);

  async function downloadPDF(event: React.FormEvent) {
    event.preventDefault();

    setShowCertificate(true);
    
    // Wait for DOM to render
    await new Promise(resolve => setTimeout(resolve, 500));

    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 841,
          height: 594
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [841, 594]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, 841, 594);
        pdf.save(`${name}-certificate.pdf`);
      } catch (error) {
        console.error("PDF generation error:", error);
      }
    }
    
    setShowCertificate(false);
    setEventName("");
    setName("");
    setCollegeName("");
    setEmail("");
  }

  return (
    <>
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 py-8"
      >
        <img
          src="/revil_icon.png"
          alt="Revil2026"
          className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
        />

        <p className="text-white font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-4 sm:mt-5 text-center">
          REVIL 2026
        </p>

        <form onSubmit={downloadPDF} className="w-full max-w-md lg:max-w-xl p-4 sm:p-6 md:p-8 bg-black border-2 border-white/10 rounded-lg mt-8 sm:mt-10 md:mt-12">
          <p className="text-white font-bold">
            Full Name <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            title="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name to be on certificate"
            className="w-full bg-black px-4 py-3 border-[1.5px] border-white/20 rounded-sm mt-2 placeholder:text-white/20"
            required
          />

          <p className="text-white font-bold mt-5">
            College Name <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            title="College Name"
            value={collegeName}
            onChange={(event) => setCollegeName(event.target.value)}
            placeholder="Enter your college name"
            className="w-full bg-black px-4 py-3 border-[1.5px] border-white/20 rounded-sm mt-2 placeholder:text-white/20"
            required
          />

          <p className="text-white font-bold mt-5">
            Email Address <span className="text-red-500">*</span>
          </p>
          <input
            type="email"
            title="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-black px-4 py-3 border-[1.5px] border-white/20 rounded-sm mt-2 placeholder:text-white/20"
            required
          />

          <p className="text-white font-bold mt-5">
            Select Event <span className="text-red-500">*</span>
          </p>
          <select
            title="Event"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            className={`
            w-full bg-black px-4 py-3 border-[1.5px] border-white/20 rounded-sm mt-2
            ${eventName === "" && "text-white/20"}
          `}
            required
          >
            <option value="" disabled>Select Event/Workshop name</option>
            <option value="Capture The Flag">Capture The Flag</option>
            <option value="Project Sherlock Homes: Logtrace">Project Sherlock Homes: Logtrace</option>
            <option value="Beneath The Mask">Beneath The Mask</option>
            <option value="Crime Chronicles">Crime Chronicles</option>
            <option value="Paper Presentation">Paper Presentation</option>
            <option value="Escape Room">Escape Room</option>
            <option value="Oh-Sin-T">Oh-Sin-T</option>
            <option value="Pixel Palette">Pixel Palette</option>
            <option value="Offensive Security">Offensive Security</option>
            <option value="Embedded System 101">Embedded System 101</option>
            <option value="Turning Threats Into Defence">Turning Threats Into Defence</option>
          </select>

          <button
            type="submit"
            className="p-4 w-full bg-white/50 hover:bg-white transition-all duration-300
            mt-10 disabled:bg-white/50 text-black disabled:cursor-not-allowed hover:cursor-pointer"
            disabled={email.trim() === "" || name.trim() === "" || collegeName.trim() === "" || eventName.trim() === ""}
          >
            Generate Certificate
          </button>
        </form>
      </div>

      {showCertificate && (
        <div 
          ref={certificateRef} 
          style={{ 
            position: 'fixed',
            top: '100vh',
            left: '0',
            width: '841px', 
            height: '594px',
            backgroundColor: '#ffffff',
            zIndex: 9999
          }}
        >
          <img 
            src="/revil_2026_certificate.png"
            alt="Certificate" 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '841px', 
              height: '594px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <div style={{
            position: 'absolute',
            zIndex: 10
          }}>
            <div style={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginTop: '290px',
              marginLeft: '368px',
              width: '360px',
              textAlign: 'center',
            }}>
              {name}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginTop: '7px',
              marginLeft: '30px',
              width: '475px',
              textAlign: 'center',
            }}>
              {collegeName}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#FFFFFF',
              marginTop: '8px',
              marginLeft: '85px',
              width: '345px',
              textAlign: 'center',
            }}>
              {eventName}
            </div>
          </div>
        </div>
      )}
    </>
  );
}