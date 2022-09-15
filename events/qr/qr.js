const qrcode=require("qrcode-terminal")
/**
 *
 * @param {Client} client
 * @returns
 */
 module.exports = async (client,qr) => {
    qrcode.generate(qr, { small: true });
}

  