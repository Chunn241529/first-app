import { NfcManager, NfcTech } from 'react-native-nfc-manager';

// Khởi tạo và quản lý NFC
export async function initNfc() {
    await NfcManager.start();
}

export async function readNdef() {
    try {
        await NfcManager.requestTechnology([NfcTech.Ndef]);
        const tag = await NfcManager.getTag();
        // Xử lý dữ liệu từ tag ở đây
        return tag;
    } catch (ex) {
        // Xử lý lỗi khi đọc tag
        console.warn(ex);
        throw ex;
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
}

export async function writeNdef(url) {
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);

        const ndefPayload = NfcManager.uriToNdef(url);
        const ndefRecord = NfcManager.createNdefRecord(NfcTech.Ndef, ndefPayload);

        const ndefMessage = [ndefRecord];

        const result = await NfcManager.ndefHandler(ndefMessage);
        return result;
    } catch (ex) {
        console.warn('Error writing URL to NFC tag:', ex);
        throw ex;
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
}

export async function stopNfc() {
    await NfcManager.stop();
}
