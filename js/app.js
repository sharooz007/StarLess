// Scroll-reveal: motivated by sequence (sections enter as you reach them). IntersectionObserver, no scroll listener.
  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  })();

"use strict";

// ---- Embedded star masks (from the Omni watermark itself) ----
// bg_48: 48x48 grayscale star (strength = max(r,g,b)/255), white overlay. Used for 720p.
// paired_star: 84x84 RGBA star carrying the watermark's real soft alpha + real colours.
//   Used for 1080p exactly as the original site does. The unblend (pixel-alpha*colour)/(1-alpha)
//   reconstructs the content underneath.
const MASK_720 = "data:image/png;base64,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";
const MASK_1080 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAANKklEQVR4Ae3BXY+eiWEW4Ot+3vnw2B5/xM7uZpuvEkFCEkWkEkmpKKRUpEIc0KoHSAiQOOHn8Ac4ggPOIAT1AImoNFC1KCWpmpCoFW0Vmk3Drtffs/aMZ97n5rEeo9eTWXt3s7bnPdjrig88U/GBZyo+8EzFGmobBDUbMKKIWZNYN7Fm2nooiZ8Sj3TikSTWSayvYAvbGDBgiQM8wNhWEusk1kzbmCQpXmr7AP8U+/haki28gWXbTGqNxJppu0CTmLza9q/gK3iA7yf5fdzFYdvRJIl1EWum7YAmOYMPt/0sPop9ZPIfMOCtTpLUGok103ZAk5zHdtuvmt3By/h3SS7gjbbBmMS6iDXR1iQYMCZ5qe0R/jn+HAd4GX+Q5C5eayuJtpLUGog10TYeSbKBV9t+Ap/HX5idQZP8N9xse2Q2JBmtgVgjbSVZYMek7T/BPVzHNoKX8VtJbmGvbcyaxGmLNdE2yMTkUtuP4FfxQxwhKF7C3SS/i5ttl0lGBKNTFmui7UaSJc5ip+2vmV3HgA0cYhMv498kOdf2NjJZWgOxJtpKYvJS2118FX+BYjAbsYFX8IdJXsO1TrA0SeI0xekKarbABQxt/wEWeAMDYlazKxiTfA0L3DEL6hTFKWoriUcGvNL2HP4eXseh2YBixBEu4Cp+J8ktvGHSdjRJ4rTEKWo7IFgmuYhl21/DWdzGEkFQFCMGXMG9JF/HZbzRNpNOJHEa4hS0lUTbDSyTbOKlti/js9jDIYogqNlotoVL+EGSH+MW9jF2YpLEixYvWFuToMhkA1fa3sc/whFuWwmKmI1mAy6i+E9JLuP1tocoMqkXLF6wtjELmmQX222/jKt400lFEBQ128Bl/CTJ97DX9i6KTOoFi1PQNsjkPK60vYIv4BYOrARBHVezYguX8QdJ7uIN3G87JBkR1AsSL1DbmG0kMflE21v4h9jHfbMRRTxZzQbs4Cy+luQCXmtr0iTaSuJFiBeo7YAByyQvY6/tV7GLm1giCOrJYlYEwQXcTPLb2MadTrDAEYYko+csXpC2wQaWSS5hq+3n8XFcx5FZENTTxSwYsYXL+F6S13Ab99uaNBMU9RzFC9J2I0lxFpfbfgyfxnU8wICYxdurlSJmQbGLTXwvyeu42/YtFE3ieYvnpK0k2gYDxiQfwkbbT+LzuI19jBjM4slqpYiVYoEz2MYfJrmOvbZvIWYjMhk9B/GMtTUJimCRxOQyNttewd/CTRxgiQVGxNPVLKiVIhjMtnARv5vkHm5hD50MGNAkS89YPAdtJdF2kWTAOWy1/Xl8DrexbxYr8XT19oogZgPOYAffSnINe7jf1mQwSTJ6xuLZGTCatM3EZAcXcL/tL+IV3MDSLIiVWKlZUCcFtVKzAUVxBmfwgyQ/xgH2sGw7JBkR1DMS71/amgQLHGKRZAsX297G38dV3MABYhazII6rk2oWJ9VKELMN7OLPknwfm22vIwiCESOaxPsR70NbjwTBmGQT57HbdhO/hAF3cIgRsRLHBUXNYlazeLqaBTEbcBWv4xtJXsYb2G8bBGOSTjyUxM8i3qO2HkqibVBksoFtnEEnfw1/HW9hDyMWGDCiiJNiNprFO6uTYqVY4BIO8N0k1zBiD4eoSVuTmDWJ9yJ+Rm0HBGOSHezgXNt9/Aq28RYemI2IlVgJRivB6Lh4siKolZgVwYABm9jGTfyXJB/F7bY3MKAIinokSb0L8Q7amuShtiOCTIpNXMTZtm/il/EqjnAbS9QsqFkQBLVSs6BWaiVWglqp4+K4YEBwGXv4kyQ/wkVca3sPMQuCmo1J6iniKdpKoq0k2koyYIEPIbjZ9m/gs2b3cB/FiGKB0XGDk2oWKzWrlZgFdVzN4qQ47gx2cAffSbKP4Db228bKYFYUTeKnxdtL22DMxCzYxjls42bbz+NzGLGPA4wIjhCzOmlAULNaCWqliFlQxxWxUsTTFcUZnMNZvIn/keQBljjAAY7aLhAUY5J6G/FkA4JtnEMxtF3iS/gEjnATD6zUSq3EcXFSEQT1dPV0cVytFEGtbOA8dlF8F99J8iE8wB6OsGwribaSeFw8pm0mJgucxwYO2m7go/g0ruIBruPILN5ercRJQR1XBPHe1Ekxq5NqJRgRDNjCh3GEH+L7SR5gA4c4wCEO20pSj8Rj2mZS7LYd8Cl8FFexhT3s4YFZsYERcVwdFycFNQvqpHh36t0L6qQjBCMW2MUFDLiD13ENryXZx2HbMcnokXhM2zyE7bb/GGfxExT3sY0jxGxArNRKUStxUsyKoFaCIp6ufjZ1XBCzQywRswELXMQFDEn+tUnboyT1SDymbR5qu4F/gW3cN9vDXRQxW6AYcOS9i+NqFrNaiePqvamVOKkYEBxhA0cYzc5gF1ewkeRfYavtQZJ6JB7Tdkgy4kzbDbyKT+IVXEBxHfewRMwG1Eo9H3FSzeK4Oq5W4smCEcF5nMcOlriN1/HnSd7AftsxyeiReEzbIJMFLmBAcL9t8Av4eZzB61hixBEGBEG9f0EdF7N6sqBOquPipCUGbOEqBvxf/HGSv8Su2SHu4V5bSeqReEzbmCQpNs02sI0dbOJG2y/gF3CIG9jH0ixmMatZPF1QK0EdFyfVSszq7RWxEisjzuA8zuBP8O0k22ZHeIAjHGE0GzB6JB7T1kNJtJUJggHFGZzHJu63vYRfxFns4QHuY4HRcUGtxCxmtRKzmsV7U9QsVoKiCEZsYBebOMC3k1zDJvax3/YBMikG1Kx+SvyUtpl0IolHYrbAAgtsYxNj2yv4As7hCHcxYsRgNjpuMIvZ6LigVmJWxJPVrGYxq1kQs4s4gxv4QZI3cQ57uIsjdGLSTMyCmtVj4h209VAS/19bmWADl7CJe20/g09hA/dwiCOzOm6wEozem3i6mhVBzQYscB7BHyV5Dbu4i308aLvEgGJMYhKzeoJ4l9oGRRBsJHmAAdvYxMW21/EVvIT7uIclBtQsiJWgqFnMaiVmdVxQxHG1EtTsHHZwDd9M8hLu4JbZ2HYTS4xJimD0LsR71DaoSRJtMykW2MBlbLS9gC8iuGUWjBisBPX2iliplZgVA+q4EQOKYolX8QDfSXINC9zBfdRj2mZiUu9BvE9tTWKSidkOPtT2EH8H53AdD7AwCwbUkxVBEdRKULNYqVmwRHEGV/AjfDvJJdzAXRx1ksSzEM9AW49kUgTncAlvtf2b+Bhu4cBKENTbK2JWx8WsiJVaKXZwFX+W5PdxCW/iAca2MrFS70M8e8HQVpJtnMN227+Kj+MODhHESj1drcQsVooiKIotXMAPk/wxij3ca+uhJCZBPQPxnLSNSZJN7OBC21fxOexh36wYMWBEzOKkentBsMQCR9jBZXwryXUc4AZGk7ZBkwwYPSPxnLT1UCbYxEWcbbuLL+EuDrDEgNEsVuK4IlaKmNVsxBY+jP+e5B72caPtEQYEYxKTeobiOWkbjyTpZEiyiyttd/BF7GMftRIr8faKOK4INnAVv5fkJg5wy2xpNmD0HMRz0tYjQbDAYZJLuNr2I/g0rmMfC7OgiCcr4rgRF3AWf5rkT7GPm22HJEcI6jmKF6BtMGBIMuIyLrb9NF7GDRxicFK8s6L4BP53kv+FfezhCJ3IBPUcxYsRk7YDmmQDF7Bs+8vYxS0rcVxQK7EyYoGzuIXfTvIR/KTtYZJ6geLFSSeISSb4ZNtr+A3cwwHqncWsZtvYxTeSDHgdh23HJF6keHGGtmMmJm2HJJt4te0OvowbOEScFLMiZsWAS/hukjdxA/cRjAjqBYlT0tZDSS7gQtsv4hW8hk2MnqwYsMRl3E3ye1jiFoLRKYhT0laSAcVLOGr7m7iLm9hEzYJaqdkFLPDvk+ziOpZIJ0m8aHE6YtJJkgHFx9ru4Mu4gyMENQuKmm3hKv5nkut4s+09ZGJSpyBOV8yKHVxo+yWcw10ENQuKoPgwmuTr2MD1tpLUKYr1ELNPtt3CV/AaahazAUXxcXwzyVv4cdtlEo/UKYk10VaSizjb9lewjdfNggWWGHAWW0l+C0vsYUTM6pTE6Qs6ycTkpbZb+HX8CEcIjsy28DK+meQGbuEQQTA6RbEeBnSSyYCfa/tL2MAts2KJ89hN8h8x4k5bSUYEdYpiPQwmbcckC1xtewV/F69jiQNs4RX8UZIf4hrGtjJBnbJYDxtYtpUJdrDV9jdxF7ewgU28jH+bZBfXUKSTJE5brI+hE2Qy4KW2n8Jn8X+wwIewn+S/4qDtXpIiqDUQ62NAJzLBbtt7+Jf4Me7j5/CtJNdxve2hWZNYB7FG2nokky3stP1VbOE+LuPrSTbwZicmSWpNxHpKW0k+0vYz+ATuYpHkP2OJe52gSayLWC8xS9tMLrT9DP429vCTJL+DvU4wokmsi1g/QRCcbXuAf4YDfCPJPdxpGzSJdRLrJwiCTSwQLLDEEZY4Mqs1EutnYaVWBoyOK2qNxBpraxLH1SSJdRQfeKbiA89UfOCZ+n8JRUivT8D+agAAAABJRU5ErkJggg==";

// ---- constants from target ----
const SUPPORTED = new Set(["1280x720","720x1280","1920x1080","1080x1920"]);
const OPACITY_CANDIDATES = [1, 0.62];      // U
const MARGINS_720 = [144, 120, 128, 72];   // E
const MARGINS_1080 = [222, 186];
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

// ---- mask loader (target's D) ----
function loadMask(src, size, isRGBA) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = size; c.height = size;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const values = new Float32Array(size * size);
      const colorValues = isRGBA ? new Float32Array(size * size * 3) : undefined;
      for (let e = 0; e < values.length; e++) {
        const t = 4 * e;
        if (isRGBA) {
          values[e] = data[t + 3] / 255;
          colorValues[3*e] = data[t]; colorValues[3*e+1] = data[t+1]; colorValues[3*e+2] = data[t+2];
        } else {
          values[e] = Math.max(data[t], data[t+1], data[t+2]) / 255;
        }
      }
      resolve({ values, colorValues, width: size, height: size });
    };
    img.onerror = () => reject(new Error("Could not load star mask."));
    img.src = src;
  });
}

// ---- background ring estimate (target's inner fn at L) ----
function backgroundStats(img, p) {
  const r = Math.max(8, Math.round(0.25 * p.alphaMap.width));
  const x0 = Math.max(0, p.x - r), y0 = Math.max(0, p.y - r);
  const x1 = Math.min(img.width, p.x + p.alphaMap.width + r);
  const y1 = Math.min(img.height, p.y + p.alphaMap.height + r);
  const sum = [0, 0, 0]; let n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    if (x >= p.x && x < p.x + p.alphaMap.width && y >= p.y && y < p.y + p.alphaMap.height) continue;
    const a = (y * img.width + x) * 4;
    sum[0] += img.data[a]; sum[1] += img.data[a+1]; sum[2] += img.data[a+2]; n++;
  }
  if (n === 0) return null;
  const d = sum.map(v => v / n);
  return { luma: 0.2126*d[0] + 0.7152*d[1] + 0.0722*d[2], channels: d };
}

// implied-opacity least squares (target's inner fn `i`)
function impliedOpacity(img, p, bg) {
  const hasColor = p.alphaMap.colorValues !== undefined;
  const cv = p.alphaMap.colorValues;
  let num = 0, den = 0;
  for (let l = 0; l < p.alphaMap.height; l++) for (let s = 0; s < p.alphaMap.width; s++) {
    const d = l * p.alphaMap.width + s, c = p.alphaMap.values[d];
    if (c <= 0.08) continue;
    const pix = ((p.y + l) * img.width + p.x + s) * 4;
    const w = Math.min(1, 8 * c);
    for (let ch = 0; ch < 3; ch++) {
      const ov = hasColor && cv ? cv[3*d+ch] : 250;
      const base = bg.channels[ch];
      const slope = c * p.baseStrength * (ov - base);
      if (slope <= 2) continue;
      num += (img.data[pix+ch] - base) * slope * w;
      den += slope * slope * w;
    }
  }
  return den <= 0 ? null : clamp(num / den, 0, 1);
}

// score one (frame, placement, opacity) - target's scoring fn
function scoreOpacity(img, p, opacity) {
  const bg = backgroundStats(img, p);
  if (bg === null) return { opacity, score: Infinity };
  const implied = impliedOpacity(img, p, bg);
  const hasColor = p.alphaMap.colorValues !== undefined;
  const cv = p.alphaMap.colorValues;
  let lumaDevSum = 0, lumaW = 0, edgeSum = 0, edgeW = 0, clipSum = 0, clipW = 0;
  for (let i = 0; i < p.alphaMap.height; i++) for (let h = 0; h < p.alphaMap.width; h++) {
    const m = i * p.alphaMap.width + h, f = p.alphaMap.values[m];
    if (f <= 0.04) continue;
    const x = Math.min(f * p.baseStrength * opacity, opacity), g = 1 - x;
    if (g <= 1e-4) continue;
    const pix = ((p.y + i) * img.width + p.x + h) * 4;
    const rec = [0,0,0]; let clip = 0;
    for (let ch = 0; ch < 3; ch++) {
      const ov = hasColor && cv ? cv[3*m+ch] : 250;
      const val = (img.data[pix+ch] - x*ov) / g;
      rec[ch] = val; clip += Math.max(0, -val, val - 255);
    }
    const luma = 0.2126*rec[0] + 0.7152*rec[1] + 0.0722*rec[2];
    const w = Math.min(1, 8 * f);
    lumaDevSum += Math.abs(luma - bg.luma) * w; lumaW += w;
    clipSum += clip/3 * w; clipW += w;
    // edge continuity vs neighbours outside the star
    let eSum = 0, eN = 0;
    for (let r = -1; r <= 1; r++) for (let a = -1; a <= 1; a++) {
      if (a === 0 && r === 0) continue;
      const ox = h + a, oy = i + r;
      if (ox < 0 || ox >= p.alphaMap.width || oy < 0 || oy >= p.alphaMap.height) continue;
      if (p.alphaMap.values[oy*p.alphaMap.width+ox] > 0.04) continue;
      const np = ((p.y+oy)*img.width + p.x+ox) * 4;
      const nl = 0.2126*img.data[np] + 0.7152*img.data[np+1] + 0.0722*img.data[np+2];
      eSum += Math.abs(luma - nl); eN++;
    }
    if (eN > 0) { edgeSum += eSum/eN * w; edgeW += w; }
  }
  const h = lumaW > 0 ? lumaDevSum/lumaW : Infinity;
  const pe = edgeW > 0 ? edgeSum/edgeW : h;
  const f = implied === null ? h : 255 * Math.abs(implied - opacity);
  const clipAvg = clipW > 0 ? clipSum/clipW : 0;
  return { opacity, score: 0.75*f + 0.15*h + 0.08*pe + 0.02*clipAvg };
}

function pickBest(scores) {
  const t = scores.filter(s => Number.isFinite(s.score)).sort((a, b) => a.score - b.score);
  if (!t.length) return { opacity: OPACITY_CANDIDATES[0], margin: 0 };
  return { opacity: t[0].opacity, margin: t[1] ? t[1].score - t[0].score : Infinity };
}

function estimateOpacityForFrame(img, p) {
  if (p.alphaMap.colorValues !== undefined) return { opacity: 1, margin: Infinity };
  return pickBest(OPACITY_CANDIDATES.map(o => scoreOpacity(img, p, o)));
}

// position score: correlation between mask alpha and frame brightness (target's fn)
function positionScore(img, p) {
  let sm = 0, sm2 = 0, sa = 0, sa2 = 0, sma = 0, n = 0;
  for (let s = 0; s < p.alphaMap.height; s++) for (let d = 0; d < p.alphaMap.width; d++) {
    const c = p.alphaMap.values[s*p.alphaMap.width+d];
    if (c <= 0.08) continue;
    const u = ((p.y+s)*img.width + p.x+d) * 4;
    const m = (img.data[u] + img.data[u+1] + img.data[u+2]) / 765;
    sm += m; sm2 += m*m; sa += c; sa2 += c*c; sma += m*c; n++;
  }
  if (n === 0) return -Infinity;
  const mm = sm/n, ma = sa/n;
  const denom = Math.sqrt((sm2 - n*mm*mm) * (sa2 - n*ma*ma));
  return denom <= 0 ? -Infinity : (sma - n*mm*ma) / denom;
}

// Decide where the star is.
// 1080p: the watermark sits at a fixed spot (m222), confirmed against real videos.
//   The correlation contest kept drifting to m186 because the 84px boxes overlap
//   and the star is small, so we pin to m222 instead of re-voting per video.
//   (A free-form search was tried first and rejected: it false-locked onto bright
//   leather highlights.)
// 720p: keep the correlation contest across the four tuned candidates (works well).
function detectPosition(frames, mask, c, u, is1080, candidates) {
  if (is1080) return { x: candidates[0].x, y: candidates[0].y }; // m222, fixed
  const def = candidates[0];
  const best = candidates.reduce((a, b) => (b.score > a.score ? b : a));
  const margin = 0.04 * Math.max(1, frames.length);
  const picked = best.score >= def.score + margin ? best : def;
  return { x: picked.x, y: picked.y };
}

// ---- the actual removal: reverse alpha-compositing (target's inner fn in $) ----
function unblend(img, p) {
  const out = new Uint8ClampedArray(img.data);
  const a = p.opacity;
  const ceiling = p.ceiling ?? 1;
  const hasColor = p.alphaMap.colorValues !== undefined;
  const cv = p.alphaMap.colorValues;
  const overlay = p.overlayValue ?? 250;
  const s = p.alphaMap.width, d = p.alphaMap.height;
  const touched = p.edgeCleanup ? new Uint8Array(s*d) : null;

  for (let u = 0; u < d; u++) for (let dx = 0; dx < s; dx++) {
    const m = u*s + dx;
    const h = Math.min(p.alphaMap.values[m] * p.baseStrength * a, ceiling);
    if (h < 0.002) continue;
    const pix = ((p.y + u) * img.width + p.x + dx) * 4;
    const f = 1 - h;
    if (f <= 1e-4) continue;
    if (touched) touched[m] = 1;
    for (let ch = 0; ch < 3; ch++) {
      const ov = hasColor && cv ? cv[3*m+ch] : overlay;
      out[pix+ch] = Math.round(clamp((img.data[pix+ch] - h*ov) / f, 0, 255));
    }
  }

  // edge cleanup: dilate touched mask, then iterative neighbour-averaging fill
  if (p.edgeCleanup && touched) {
    const { strength, radius } = p.edgeCleanup;
    const dil = new Uint8Array(s*d);
    for (let e = 0; e < d; e++) for (let t = 0; t < s; t++) {
      if (!touched[e*s+t]) continue;
      for (let r = -radius; r <= radius; r++) for (let a2 = -radius; a2 <= radius; a2++) {
        const i = t+a2, n = e+r;
        if (i >= 0 && i < s && n >= 0 && n < d) dil[n*s+i] = 1;
      }
    }
    const active = new Uint8Array(dil);
    const iters = Math.min(120, Math.max(8, s + d));
    for (let it = 0; it < iters; it++) {
      let changed = 0; const next = new Uint8Array(active);
      for (let l = 0; l < d; l++) for (let cc = 0; cc < s; cc++) {
        if (!active[l*s+cc]) continue;
        let cnt = 0; const sum = [0,0,0];
        for (let a2 = -1; a2 <= 1; a2++) for (let i = -1; i <= 1; i++) {
          if (i === 0 && a2 === 0) continue;
          const ox = cc+i, oy = l+a2;
          if (ox < 0 || ox >= s || oy < 0 || oy >= d || active[oy*s+ox]) continue;
          const pp = ((p.y+oy)*img.width + p.x+ox) * 4;
          sum[0] += out[pp]; sum[1] += out[pp+1]; sum[2] += out[pp+2]; cnt++;
        }
        if (cnt === 0) continue;
        const hh = ((p.y+l)*img.width + p.x+cc) * 4;
        for (let e = 0; e < 3; e++) {
          const t = sum[e]/cnt;
          out[hh+e] = Math.round(out[hh+e]*(1-strength) + t*strength);
        }
        next[l*s+cc] = 0; changed++;
      }
      active.set(next);
      if (changed === 0) break;
    }
  }
  return new ImageData(out, img.width, img.height);
}

// ---- demux MP4 with MP4Box, keep audio + codec description (target's R first half) ----
function demux(buffer) {
  return new Promise((resolve, reject) => {
    if (!window.MP4Box) return reject(new Error("MP4Box failed to load."));
    const file = window.MP4Box.createFile();
    const videoSamples = [], audioSamples = [];
    let vTrack, aTrack;
    file.onError = e => reject(new Error("MP4 demux failed: " + e));
    file.onReady = info => {
      vTrack = info.videoTracks?.[0];
      aTrack = info.audioTracks?.[0];
      if (!vTrack) return reject(new Error("No video track found in this MP4."));
      file.setExtractionOptions(vTrack.id, "video", { nbSamples: 1e6 });
      if (aTrack) file.setExtractionOptions(aTrack.id, "audio", { nbSamples: 1e6 });
      file.start();
    };
    file.onSamples = (id, user, samples) => {
      const arr = user === "video" ? videoSamples : audioSamples;
      for (const s of samples) arr.push({ ...s, data: s.data.slice(0) });
    };
    const buf = buffer.slice(0); buf.fileStart = 0;
    file.appendBuffer(buf); file.flush();
    if (!vTrack) return reject(new Error("No video track found in this MP4."));
    // extract avcC/hvcC description bytes
    let description = null;
    const trak = file.getTrackById(vTrack.id);
    for (const entry of (trak.mdia?.minf?.stbl?.stsd?.entries ?? [])) {
      const box = entry.avcC ?? entry.hvcC ?? entry.vpcC ?? entry.av1C;
      if (!box || !window.DataStream) continue;
      const ds = new window.DataStream(undefined, 0, window.DataStream.BIG_ENDIAN);
      box.write(ds);
      description = new Uint8Array(ds.buffer, 8);
      break;
    }
    resolve({ vTrack, aTrack, videoSamples, audioSamples, description });
  });
}

// AudioSpecificConfig for AAC passthrough (target's inline builder)
function aacDescription(sampleRate, channels) {
  const rates = [96000,88200,64000,48000,44100,32000,24000,22050,16000,12000,11025,8000,7350];
  let idx = rates.indexOf(sampleRate);
  if (idx < 0) idx = 4;
  return new Uint8Array([16 | (idx >> 1), ((1 & idx) << 7) | (channels << 3)]);
}

// Build the mask + candidate placement(s) for a given resolution. Mirrors the
// original site exactly. Shared by the processor and the debug preview.
// 720p: bg_48 grayscale star (isRGBA=false) at four candidate margins.
// 1080p: paired_star RGBA (isRGBA=true → soft alpha + real colours) at margins [222,186].
async function buildMaskAndCandidates(c, u) {
  const is1080 = (c === 1920 && u === 1080) || (c === 1080 && u === 1920);
  const mask = await loadMask(is1080 ? MASK_1080 : MASK_720, is1080 ? 84 : 48, is1080);
  const margins = is1080 ? MARGINS_1080 : MARGINS_720;
  const candidates = margins.map(e => ({
    x: clamp(c - e, 0, c - mask.width), y: clamp(u - e, 0, u - mask.height),
    alphaMap: mask, score: 0, baseStrength: 1,
  }));
  return { is1080, mask, candidates, margins };
}

// ---- main pipeline ----
async function process(buffer, mode, onProgress) {
  if (typeof VideoDecoder === "undefined" || typeof VideoEncoder === "undefined")
    throw new Error("This browser lacks WebCodecs. Use recent Chrome or Edge.");
  if (!window.Mp4Muxer) throw new Error("mp4-muxer failed to load.");

  onProgress("Reading MP4…", 0);
  const { vTrack, aTrack, videoSamples, audioSamples, description } = await demux(buffer);

  const c = vTrack.video.width, u = vTrack.video.height;
  const dimKey = `${c}x${u}`;
  if (!SUPPORTED.has(dimKey))
    throw new Error(`Unsupported dimensions ${c} × ${u}. Use 1280×720, 720×1280, 1920×1080, or 1080×1920.`);

  const total = videoSamples.length || 1;
  const timescale = videoSamples[0]?.timescale ?? vTrack.timescale ?? 30000;
  const avgDur = videoSamples.reduce((s, x) => s + x.duration, 0) / total || timescale/30;
  const fps = Math.max(1, Math.round(timescale / avgDur));

  const { is1080, mask, candidates } = await buildMaskAndCandidates(c, u);

  // muxer
  const muxer = new window.Mp4Muxer.Muxer({
    target: new window.Mp4Muxer.ArrayBufferTarget(),
    fastStart: "in-memory",
    firstTimestampBehavior: "offset",
    video: { codec: "avc", width: c, height: u },
    audio: aTrack ? { codec: "aac", sampleRate: aTrack.audio.sample_rate, numberOfChannels: aTrack.audio.channel_count } : undefined,
  });

  // encoder config: High profile, fallback to Baseline
  const bitrate = clamp(Math.round(c * u * fps * 0.12), 2_000_000, 20_000_000);
  let encCfg = { codec: "avc1.640028", width: c, height: u, bitrate, framerate: fps, avc: { format: "avc" } };
  if (!(await VideoEncoder.isConfigSupported(encCfg)).supported) {
    encCfg = { ...encCfg, codec: "avc1.42001f" };
    if (!(await VideoEncoder.isConfigSupported(encCfg)).supported)
      throw new Error("This browser cannot encode H.264 MP4.");
  }

  let encErr = null, decErr = null;
  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: e => { encErr = e; },
  });
  encoder.configure(encCfg);

  const canvas = document.createElement("canvas");
  canvas.width = c; canvas.height = u;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const bufferLimit = Math.min(5, total);
  let placement = null;
  let encoded = 0, buffered = 0;
  const pending = [];
  const keyEvery = Math.max(1, 2 * fps);

  const encodeFrame = (item) => {
    const result = unblend(item.imageData, placement);
    const init = { format: "RGBA", codedWidth: c, codedHeight: u, timestamp: item.timestamp };
    if (item.duration != null) init.duration = item.duration;
    const frame = new VideoFrame(result.data.buffer, init);
    encoder.encode(frame, { keyFrame: encoded % keyEvery === 0 });
    frame.close();
    encoded++;
    onProgress("Removing watermark…", encoded / total);
  };

  const finalizeDetection = () => {
    // position: 720p picks the best tuned candidate; 1080p is pinned to m222 (confirmed).
    const pos = detectPosition(pending, mask, c, u, is1080, candidates);
    placement = { x: pos.x, y: pos.y, alphaMap: mask, baseStrength: 1 };

    // opacity, exactly as the original site: colourValues (1080p) always uses 1;
    // otherwise estimate (auto) or take the mode's fixed value.
    let chosen;
    if (placement.alphaMap.colorValues !== undefined) chosen = 1;
    else if (mode === "full") chosen = 1;
    else if (mode === "subtle") chosen = 0.62;
    else { // auto: estimate from [1, 0.62] across the buffered frames
      const acc = OPACITY_CANDIDATES.map(o => ({ opacity: o, score: 0, count: 0 }));
      for (const it of pending) for (const o of OPACITY_CANDIDATES) {
        const sc = scoreOpacity(it.imageData, placement, o);
        const slot = acc.find(a => a.opacity === o);
        if (Number.isFinite(sc.score)) { slot.score += sc.score; slot.count++; }
      }
      chosen = pickBest(acc.map(a => ({ opacity: a.opacity, score: a.count > 0 ? a.score/a.count : Infinity }))).opacity;
    }
    placement.opacity = chosen;
    // grayscale (720p) full removal → push to white + light edge cleanup (original behaviour).
    if (chosen >= 1 && placement.alphaMap.colorValues === undefined) {
      placement.overlayValue = 255;
      placement.ceiling = 0.99;
      placement.edgeCleanup = { strength: 0.6, radius: 2 };
    }
    // 1080p colourValues path: the soft mask boundary leaves a faint star-shaped
    // edge ring. Diffuse the footprint boundary from clean neighbours to blend it out.
    if (placement.alphaMap.colorValues !== undefined) {
      placement.edgeCleanup = { strength: 0.7, radius: 3 };
    }
  };

  const decoder = new VideoDecoder({
    output: (frame) => {
      try {
        const timestamp = frame.timestamp, duration = frame.duration;
        ctx.drawImage(frame, 0, 0, c, u); frame.close();
        const imageData = ctx.getImageData(0, 0, c, u);
        const item = { imageData, timestamp, duration };
        if (!placement) {
          for (const cand of candidates) cand.score += positionScore(imageData, cand);
          pending.push(item);
          if (++buffered >= bufferLimit) {
            finalizeDetection();
            for (const it of pending) encodeFrame(it);
            pending.length = 0;
          }
          return;
        }
        encodeFrame(item);
      } catch (e) { decErr = e; try { frame.close(); } catch {} }
    },
    error: e => { decErr = e; },
  });
  decoder.configure({ codec: vTrack.codec, codedWidth: c, codedHeight: u, description: description ?? undefined });

  onProgress("Removing watermark…", 0);
  for (let i = 0; i < videoSamples.length; i++) {
    if (decErr) throw decErr;
    const s = videoSamples[i];
    decoder.decode(new EncodedVideoChunk({
      type: s.is_sync ? "key" : "delta",
      timestamp: 1e6 * s.cts / s.timescale,
      duration: 1e6 * s.duration / s.timescale,
      data: s.data,
    }));
    if (i % 24 === 0) await new Promise(r => setTimeout(r, 0));
  }
  await decoder.flush();
  await encoder.flush();
  if (decErr) throw decErr;
  if (encErr) throw encErr;
  decoder.close(); encoder.close();

  // audio passthrough
  if (aTrack && audioSamples.length) {
    try {
      const meta = { decoderConfig: {
        codec: "mp4a.40.2",
        sampleRate: aTrack.audio.sample_rate,
        numberOfChannels: aTrack.audio.channel_count,
        description: aacDescription(aTrack.audio.sample_rate, aTrack.audio.channel_count),
      }};
      for (const s of audioSamples) muxer.addAudioChunk(new EncodedAudioChunk({
        type: "key",
        timestamp: 1e6 * s.cts / s.timescale,
        duration: 1e6 * s.duration / s.timescale,
        data: s.data,
      }), meta);
    } catch (e) { console.warn("Audio passthrough failed; exporting video-only MP4.", e); }
  }

  onProgress("Finalizing MP4…", 0.98);
  muxer.finalize();
  return new Blob([muxer.target.buffer], { type: "video/mp4" });
}

// ---- UI wiring ----
const $ = id => document.getElementById(id);
let chosenFile = null, outUrl = null;

$("file").addEventListener("change", e => {
  chosenFile = e.target.files?.[0] ?? null;
  $("fileLabel").textContent = chosenFile ? chosenFile.name : "Drop or choose a video";
  $("go").disabled = !chosenFile;
  $("error").textContent = "";
});

$("go").addEventListener("click", async () => {
  if (!chosenFile) return;
  $("go").disabled = true; $("error").textContent = ""; $("outCard").style.display = "none";
  const setProgress = (msg, ratio) => { $("status").textContent = msg; $("prog").style.width = Math.round(ratio*100) + "%"; };
  try {
    const buf = await chosenFile.arrayBuffer();
    const blob = await process(buf, $("mode").value, setProgress);
    if (outUrl) URL.revokeObjectURL(outUrl);
    outUrl = URL.createObjectURL(blob);
    $("preview").src = outUrl;
    $("outInfo").textContent = `${(blob.size/1048576).toFixed(1)} MB · MP4`;
    $("outCard").style.display = "block";
    setProgress("Done.", 1);
    $("download").onclick = () => {
      const a = document.createElement("a");
      a.href = outUrl;
      a.download = (chosenFile.name.replace(/\.[^.]+$/, "") || "omni-video") + "-cleaned.mp4";
      a.click();
    };
  } catch (e) {
    $("error").textContent = "Error: " + (e?.message || e);
    setProgress("", 0);
  } finally {
    $("go").disabled = false;
  }
});

// ============================================================================
// Detection preview (debug): renders the first frame with the mask drawn where
// the tool thinks the star is, so placement can be verified by eye.
// ============================================================================
async function decodeFirstFrames(buffer, n) {
  const { vTrack, videoSamples, description } = await demux(buffer);
  const c = vTrack.video.width, u = vTrack.video.height;
  const canvas = document.createElement("canvas");
  canvas.width = c; canvas.height = u;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const frames = [];
  await new Promise((resolve, reject) => {
    const dec = new VideoDecoder({
      output: (frame) => {
        try { ctx.drawImage(frame, 0, 0, c, u); frame.close();
          if (frames.length < n) frames.push({ imageData: ctx.getImageData(0, 0, c, u) }); }
        catch (e) { reject(e); }
        if (frames.length >= n) resolve();
      },
      error: e => reject(e),
    });
    dec.configure({ codec: vTrack.codec, codedWidth: c, codedHeight: u, description: description ?? undefined });
    const take = Math.min(videoSamples.length, n + 2);
    for (let i = 0; i < take; i++) {
      const s = videoSamples[i];
      dec.decode(new EncodedVideoChunk({
        type: s.is_sync ? "key" : "delta",
        timestamp: 1e6 * s.cts / s.timescale, duration: 1e6 * s.duration / s.timescale, data: s.data,
      }));
    }
    dec.flush().then(resolve).catch(reject);
  });
  return { frames, c, u };
}

function maskToCanvas(mask) {
  const mc = document.createElement("canvas");
  mc.width = mask.width; mc.height = mask.height;
  const mctx = mc.getContext("2d");
  const id = mctx.createImageData(mask.width, mask.height);
  for (let i = 0; i < mask.values.length; i++) {
    id.data[4*i] = 0; id.data[4*i+1] = 230; id.data[4*i+2] = 255;
    id.data[4*i+3] = Math.round(Math.min(1, mask.values[i] * 4) * 190); // amplified for visibility (preview only)
  }
  mctx.putImageData(id, 0, 0);
  return mc;
}

async function previewDetection(buffer) {
  const { frames, c, u } = await decodeFirstFrames(buffer, 5);
  const dimKey = `${c}x${u}`;
  if (!SUPPORTED.has(dimKey)) throw new Error(`Unsupported dimensions ${c} × ${u}.`);
  const { is1080, mask, candidates, margins } = await buildMaskAndCandidates(c, u);
  for (const cand of candidates) for (const f of frames) cand.score += positionScore(f.imageData, cand);
  const pos = detectPosition(frames, mask, c, u, is1080, candidates);

  const canvas = document.createElement("canvas");
  canvas.width = c; canvas.height = u;
  const ctx = canvas.getContext("2d");
  ctx.putImageData(frames[0].imageData, 0, 0);
  ctx.lineWidth = Math.max(2, Math.round(c / 360));
  ctx.font = `${Math.max(13, Math.round(c / 50))}px monospace`;
  // tuned candidate boxes (yellow, for reference)
  candidates.forEach((cand, i) => {
    ctx.strokeStyle = "rgba(255,210,0,.85)";
    ctx.strokeRect(cand.x, cand.y, mask.width, mask.height);
    ctx.fillStyle = "rgba(255,210,0,.95)";
    ctx.fillText(`m${margins[i]}`, cand.x, cand.y - 4);
  });
  // chosen placement: mask shape overlay (cyan) + red box
  ctx.drawImage(maskToCanvas(mask), pos.x, pos.y);
  ctx.strokeStyle = "rgba(255,60,60,1)";
  ctx.lineWidth = Math.max(3, Math.round(c / 240));
  ctx.strokeRect(pos.x, pos.y, mask.width, mask.height);
  ctx.fillStyle = "rgba(255,60,60,1)";
  ctx.fillText("CHOSEN", pos.x, pos.y + mask.height + Math.round(c / 36));
  return { dataURL: canvas.toDataURL("image/png"),
    info: `${dimKey} · mask ${mask.width}px · chosen x=${pos.x} y=${pos.y} (${is1080 ? "m222 pinned" : "candidate"})` };
}

// inject a debug button + result image under the main button
(function () {
  const go = $("go");
  if (!go) return;
  const btn = document.createElement("button");
  btn.textContent = "Preview detection (debug)";
  btn.type = "button";
  btn.style.cssText = "width:100%;margin-top:10px;padding:11px;border:1px solid var(--line,#222838);border-radius:10px;background:transparent;color:var(--muted,#98a1b4);font:600 14px/1 system-ui;cursor:pointer";
  const img = document.createElement("img");
  img.style.cssText = "width:100%;margin-top:12px;border-radius:8px;display:none;border:1px solid var(--line,#222838)";
  go.after(btn);
  btn.after(img);
  btn.addEventListener("click", async () => {
    if (!chosenFile) { $("error").textContent = "Choose a video first."; return; }
    btn.disabled = true; $("error").textContent = ""; $("status").textContent = "Decoding first frames…";
    try {
      const { dataURL, info } = await previewDetection(await chosenFile.arrayBuffer());
      img.src = dataURL; img.style.display = "block";
      $("status").textContent = "Detection preview: " + info;
    } catch (e) {
      $("error").textContent = "Preview error: " + (e?.message || e);
      $("status").textContent = "";
    } finally { btn.disabled = false; }
  });
})();
