export type Currency = 'EUR' | 'GBP' | 'USD' | 'AUD' | 'SGD' | 'AED' | 'INR';

interface Account {
    "Account Name": string
    "BIC/IFSC/Routing/SWIFT/Sort": string
    "Account No/IBAN": string
    "Bank Name": string
    Address: string
    Remark?: string
}

export const bankList: Record<Currency, Account> = {
    "EUR": {
        "Account Name": "Sica Investment And Wealth Management Ltd",
        "BIC/IFSC/Routing/SWIFT/Sort": "TRWIBEB1XXX",
        "Account No/IBAN": "BE06 9675 2269 0122",
        "Bank Name": "",
        "Address": "Avenue Louise 54, Room S52\nBrussels\n1050\nBelgium",
    },
    "GBP": {
        "Account Name": "Sica Investment And Wealth Management Ltd",
        "BIC/IFSC/Routing/SWIFT/Sort": "23-14-70",
        "Account No/IBAN": "GB65 TRWI 2314 7038 7186 18",
        "Bank Name": "",
        "Address": "56 Shoreditch High Street\nLondon\nE1 6JJ\nUnited Kingdom",
    },
    "USD": {
        "Account Name": "Sica Investment And Wealth Management Ltd",
        "BIC/IFSC/Routing/SWIFT/Sort": "084009519",
        "Account No/IBAN": "9600011027485930",
        "Bank Name": "",
        "Address": "30 W. 26th Street, Sixth Floor\nNew York NY 10010\nUnited States",
    },
    "AUD": {
        "Account Name": "Sica Investment And Wealth Management Ltd",
        "BIC/IFSC/Routing/SWIFT/Sort": "802-985",
        "Account No/IBAN": "818332716",
        "Bank Name": "",
        "Address": "36-38 Gipps Street Collingwood 3066 Australia",
    },
    "SGD": {
        "Account Name": "Sica Investment And Wealth Management Ltd",
        "BIC/IFSC/Routing/SWIFT/Sort": "0516",
        "Account No/IBAN": "697-138-6",
        "Bank Name": "Wise Asia-Pacific Pte. Ltd.",
        "Address": "1 Paya Lebar Link #13-06 - #13-08 PLQ 2, Paya Lebar Quarter\nSingapore 408533",
        "Remark": "FAST Netwok"
    },
    "AED": {
        "Account Name": "AL SHUMOOKH AL RAEDA INVESTMENT LLC",
        "BIC/IFSC/Routing/SWIFT/Sort": "EBILAEAD",
        "Account No/IBAN": "AE960260001015754367301",
        "Bank Name": "ENBD",
        "Address": "SZR",
    },
    "INR": {
        "Account Name": "Enhanced Bio Fuels And Technologies India PvtLtd",
        "BIC/IFSC/Routing/SWIFT/Sort": "ICIC0007555",
        "Account No/IBAN": "777705699699",
        "Bank Name": "ICICI Bank",
        "Address": "Race Course Road, opp to Thomas park, Coimbatore",
    }
}

export const cryptoList: Record<'USDT', Record<string, string>> = {
    "USDT": {
        "TQcfRgZXVrL8VDRoRGYsf11J2kULpZfDFc": "https://dbaugbrwob9sy.cloudfront.net/sicapay_wallet_qr.png",
    }
}