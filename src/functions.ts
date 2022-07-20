export const hex2bin = (hex: string) => {
  let bin = ''
  if (hex.startsWith('0x')) {
    hex = hex.substring(2)
  }

  hex.split('').forEach(() => {
    bin = (parseInt(hex, 16).toString(2)).padStart(8, '0').toString()
  })
  return bin
}

export const twoComplement = (bin: string) => {
  // convert binary to two's complement
  let twoComplement = ''
  bin.split('').forEach((bit: string) => {
    if (bit === '0') {
      twoComplement += '1'
    } else {
      twoComplement += '0'
    }
  })
  
  twoComplement = (parseInt(twoComplement, 2) + 1).toString(2)

  return twoComplement
}

export const binSubtract = (bin1: string, bin2: string) => {
  if (bin1.length > 0 && bin2.length > 0) {
    return (parseInt(bin1, 2) + parseInt(bin2, 2)).toString(2).padStart(8, '0').toString()
  } else {
    return ''
  }
}