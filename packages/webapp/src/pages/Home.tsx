import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFeeProxyAddress } from '../hooks/useFeeProxyAddress'
import Address from '../components/Address'

/**
 * Full-bleed hero: the brand video covers the entire viewport (it runs
 * under the translucent sticky header), text is overlaid on the left.
 * The section breaks out of the page container via the w-screen trick,
 * and the negative top margin cancels the header (72px) + main padding
 * (56px) so the video starts at the very top of the viewport.
 */
export default function HomePage() {
  // The hero is a fixed full-viewport composition: no scrolling on Home.
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  // position:fixed pins the hero to the exact viewport box — no flow math
  // (header height + paddings + negative margins) that DPR rounding could
  // turn into a seam at the top edge.
  return (
    <section className="fixed inset-0 flex items-center overflow-hidden bg-black">
      {/* Nested masks = true intersection: horizontal fade on the wrapper,
          vertical fade on the video. A single element with two mask layers
          composites them additively in Blink, which cancels the top fade
          wherever the horizontal mask is opaque. */}
      <div
        aria-hidden
        className="absolute -right-[10%] top-0 h-[90%] aspect-video pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
        }}
      >
        <video
          src={`${import.meta.env.BASE_URL}hero.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="h-full w-full select-none"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)',
          }}
        />
      </div>

      {/* Legibility gradient over the video + fade into the page canvas below.
          Fixed black tones (not theme tokens): the video background is always dark. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent"
      />

      {/* Same horizontal padding as the header row so the copy sits on the wordmark's margin line. */}
      <div className="relative w-full px-[287px] pt-[76px]">
        {/* Previous hero block scaled up 25% (type, spacing, widths). */}
        <div className="max-w-[1000px] space-y-10">
          <h1 className="font-medium tracking-tight leading-[1.08] text-[60px] md:text-[75px] xl:text-[85px]">
            <span className="block text-neutral-400">One shared fee layer.</span>
            <span className="block text-white">Start earning on the MultiVault</span>
          </h1>

          <p className="text-[22px] text-neutral-300 leading-relaxed max-w-[560px]">
            Register your dApp as an affiliate, set your fees once, point
            your app at your affiliate address.
            Fees route straight to your
            recipient on every deposit and atom creation.
          </p>

          <div className="flex items-center gap-5">
            <Link to="/register" className="btn-primary px-6 py-3 text-[17px]">
              Register as affiliate
            </Link>
            <Link
              to="/docs"
              className="rounded-md border border-white/25 px-6 py-3 text-[17px] text-white transition-colors hover:border-white/50"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>

      {/* Footer as an overlay layer on the hero, on the shared margin line. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-[287px] py-5 flex items-center justify-between text-xs text-neutral-500">
        <FeeProxyStamp />
        <div className="flex items-center gap-5">
          <a
            href="https://intuition.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Intuition ↗
          </a>
          <a
            href="https://github.com/intuition-box"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}

function FeeProxyStamp() {
  const { feeProxy, configured } = useFeeProxyAddress()
  if (!configured) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px]">
        FeeProxy not configured
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px]">
      <span>FeeProxy</span>
      <Address value={feeProxy} variant="short" />
    </span>
  )
}
