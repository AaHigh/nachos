/**
 * Hightower Helix Nachos - Compact Re-Order Code (v2 with Blend Digit)
 * 
 * Format: R D XXX   (5 chars max)
 * R = Base ratio letter (B/C/S/X)
 * D = Blend digit 0-9 (0 = no cheese / full Indian hack, 9 = max cheese)
 * XXX = Toppings bitmask (Base-32)
 * 
 * Black Beans = +$1 extra (one can serves multiple orders)
 */

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const BASE = 32;

const RATIO_MAP = { 'B': 0, 'C': 1, 'S': 2, 'X': 3 };
const RATIO_REVERSE = ['B', 'C', 'S', 'X'];

const TOPPINGS = [
  'Black Beans (+$1)',
  'Corn',
  'Southwest Corn',
  'Green Chilies',
  'Sweet Peas',
  'Chickpeas',
  'Masala Spice',
  'Extra Dip'
];

function encodeHelixCode(ratioKey, blendDigit, selectedBits = []) {
  if (!RATIO_MAP.hasOwnProperty(ratioKey)) throw new Error("Ratio must be B, C, S, or X");
  if (blendDigit < 0 || blendDigit > 9) throw new Error("Blend digit must be 0-9");

  let bitmask = 0;
  for (const bit of selectedBits) {
    if (bit < 0 || bit > 7) throw new Error("Bit must be 0-7");
    bitmask |= (1 << bit);
  }

  const ratioValue = RATIO_MAP[ratioKey];
  // Pack: ratio (2 bits) + blend (4 bits) + bitmask (8 bits) = 14 bits
  const combined = (ratioValue << 12) | (blendDigit << 8) | bitmask;

  let code = '';
  let num = combined;
  for (let i = 0; i < 3; i++) {
    code = ALPHABET[num % BASE] + code;
    num = Math.floor(num / BASE);
  }

  return ratioKey + blendDigit + code; // e.g. "B0K4P" or "C9X7M"
}

function decodeHelixCode(code) {
  if (!code || code.length !== 5) throw new Error("Code must be exactly 5 characters");

  const ratioKey = code[0].toUpperCase();
  const blendDigit = parseInt(code[1], 10);
  if (!RATIO_MAP.hasOwnProperty(ratioKey) || isNaN(blendDigit)) {
    throw new Error("Invalid code format");
  }

  const data = code.slice(2).toUpperCase();
  let combined = 0;
  for (const char of data) {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) throw new Error("Bad character");
    combined = combined * BASE + idx;
  }

  const ratioValue = (combined >> 12) & 0b11;
  const blend = (combined >> 8) & 0b1111;
  const bitmask = combined & 0xFF;

  const toppings = [];
  for (let i = 0; i < 8; i++) {
    if (bitmask & (1 << i)) toppings.push(TOPPINGS[i]);
  }

  return {
    code: code.toUpperCase(),
    ratio: RATIO_REVERSE[ratioValue],
    blend: blend,
    bitmask,
    toppings,
    isPureIndian: blend === 0 && toppings.some(t => t.includes('Chickpeas') || t.includes('Masala'))
  };
}

// Quick test
console.log("B0 + Black Beans + Chickpeas + Masala (pure Indian hack):", encodeHelixCode('B', 0, [0,5,6]));
console.log("C9 + Everything:", encodeHelixCode('C', 9, [0,1,2,3,4,5,6,7]));
