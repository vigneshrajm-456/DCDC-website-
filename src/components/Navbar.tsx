/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.04] bg-[#06080D]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
        {/* Brand Logo - DCDC Stark White */}
        <div id="nav-brand" className="flex items-center gap-2">
          <span className="font-display font-light tracking-[0.25em] text-2xl text-white select-none uppercase">DCDC</span>
        </div>
      </div>
    </nav>
  );
}
