import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";

const heart = confetti.shapeFromText({ text: "❤", scalar: 2 });

/* EXACT 14 FEB 12:00 AM INDIA TIME (UTC FIXED FOR VERCEL) */
const UNLOCK_DATE = new Date(Date.UTC(2026, 1, 13, 18, 30, 0));

const CORRECT_PASSWORD = "26022025 and 09092025";

export default function Page() {

  /* ---------- GLOBAL AUDIO ---------- */
  const audioRef = useRef(null);
  const musicStarted = useRef(false);

  const startMusic = () => {
    if (!musicStarted.current && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
      musicStarted.current = true;
    }
  };

  /* ---------- PAGE STAGES ---------- */
  const [stage, setStage] = useState("countdown");

  /* ---------- COUNTDOWN ---------- */
  const [timeLeft, setTimeLeft] = useState("");
  const [earlyMessage, setEarlyMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = UNLOCK_DATE - now;

      if (diff <= 0) {
        setTimeLeft("It's time Meow 😍");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tryUnlockCountdown = () => {
    const now = new Date();

    if (now >= UNLOCK_DATE) {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
        shapes: [heart],
        colors: ["#ff4d6d", "#ff8fa3", "#ffc2d1"],
      });

      setTimeout(() => setStage("lock"), 1200);
    } else {
      setEarlyMessage(
        "Aeeeeeeeeeeeee, Not yet — I knew you were going to press that button 😁. Patience makes moments special."
      );

      setTimeout(() => {
        setEarlyMessage("");
      }, 9000);
    }
  };

  /* ---------- LOCK PAGE ---------- */
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [wrongMsg, setWrongMsg] = useState("");

  const handleUnlock = () => {
    if (password === CORRECT_PASSWORD) {
      setStage("valentine");
    } else {
      setError(true);
      setWrongMsg("U forgot our special day 😭😭😭... try again");

      setTimeout(() => setError(false), 800);

      setTimeout(() => {
        setWrongMsg("");
      }, 6000);
    }
  };

  /* ---------- VALENTINE PAGE ---------- */
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const fireConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        startVelocity: 18,
        spread: 360,
        ticks: 120,
        gravity: 0.6,
        scalar: 1.2,
        origin: { x: Math.random(), y: -0.1 },
        shapes: [heart],
        colors: ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleNoClick = () => setNoCount(noCount + 1);

  const getNoButtonText = () => {
    const phrases = [
      "No","Are you sure?","Really sure?","Think again!","Last chance!",
      "Surely not?","You might regret this!","Give it another thought!",
      "Are you absolutely certain?","This could be a mistake!","Have a heart!",
      "Don't be so cold!","Change of heart?","Wouldn't you reconsider?",
      "Is that your final answer?","You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  /* ---------- COUNTDOWN SCREEN ---------- */
  if (stage === "countdown") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-rose-300 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Something special is waiting 💌
        </h1>

        <div className="text-5xl font-mono mb-6">
          {timeLeft}
        </div>

        <button
          onClick={tryUnlockCountdown}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full text-lg shadow-lg"
        >
          Open When Time Comes ❤️
        </button>

        {earlyMessage && (
          <div className="mt-6 bg-white/80 backdrop-blur-md text-rose-600 font-semibold px-6 py-4 rounded-xl shadow-xl max-w-xs">
            {earlyMessage}
          </div>
        )}
      </div>
    );
  }

  /* ---------- LOCK SCREEN ---------- */
  if (stage === "lock") {
    return (
      <>
        <audio ref={audioRef} loop>
          <source src="/bg_Music.mp3" type="audio/mpeg" />
        </audio>

        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 text-center px-6">
          <div className="text-5xl mb-6 animate-pulse">🔒</div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Private Page
          </h1>

          <p className="mb-6 text-gray-700">
            hint: Our 2 special days 💭
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password..."
            className={`p-3 rounded-lg border text-center outline-none transition ${
              error ? "border-red-500 animate-pulse" : "border-rose-300"
            }`}
          />

          <button
            onClick={handleUnlock}
            className="mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full text-lg shadow-lg"
          >
            ❤️ Click to Unlock ❤️
          </button>

          {wrongMsg && (
            <div className="mt-5 bg-white/80 backdrop-blur-md text-rose-600 font-semibold px-6 py-3 rounded-xl shadow-lg max-w-xs">
              {wrongMsg}
            </div>
          )}
        </div>
      </>
    );
  }

  /* ---------- MAIN VALENTINE PAGE ---------- */
  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/bg_Music.mp3" type="audio/mpeg" />
      </audio>

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 text-zinc-900">

        {yesPressed ? (
          <>
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
            <div className="text-2xl md:text-2xl font-bold my-4">
              🥰 Yayyyy, I LOVE YOU TO THE UNIVERSE AND BACK Mahdiyaaaa 🥰!!!
            </div>
          </>
        ) : (
          <>
            <img src={lovesvg} className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28" />
            <img src={lovesvg2} className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32" />

            <img
              onClick={startMusic}
              className="h-[230px] rounded-lg shadow-lg cursor-pointer active:scale-95 transition"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp"
            />

            <div className="text-center my-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                Will you be my Valentine?
              </h1>

              <p className="text-3xl md:text-5xl mt-3 text-rose-500 font-semibold">
                Mahdiyaaa 💖
              </p>

              <p className="text-sm text-gray-600 mt-2 animate-pulse">
                Click on above teddy for small surprise 😊
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
                style={{ fontSize: yesButtonSize }}
                onClick={() => {
                  setYesPressed(true);
                  fireConfetti();
                }}
              >
                Yes
              </button>

              <button
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

const Footer = () => (
  <div className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 border p-2 rounded border-rose-300 text-sm md:text-base">
    Made with 💝 by Chicoo
  </div>
);