import * as Q from "./pako.js";


const {goPako, inflate} = Q.default
function pakoRun(args, astGo) {
	// console.log(Q)
        let sdGO = {};
        let _utf8_decode = (utftext) => {
            var string = "";
            var i = 0;
            var c = (c1 = c2 = 0);
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if (c > 191 && c < 224) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (   c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(
                        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
                    );
                    i += 3;
                }
            }
            return string;
        };

        var decode = (input) => {
            var _keyStr =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            if (input == undefined || input == null) {
            } else {
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }
        };

        var unzip = (b64Data) => {
            let strData = decode(b64Data);
            let charData = "";
            if (strData) {
                charData = strData.split("").map(function (x) {
                    return x.charCodeAt(0);
                });
            }

            // Turn number array into byte-array
            let binData = new Uint8Array(charData);
            let data = inflate(binData, {
                to: "string",
            });

            return data;
        };
        astGo = unzip(astGo);
        astGo = JSON.parse(astGo);
        console.log(astGo)
        const runastGo = goPako(astGo, sdGO);
        return runastGo;
    };
	
	
export default {pakoRun}