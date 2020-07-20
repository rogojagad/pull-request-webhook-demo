const admin = require("firebase-admin");

const config = {
    type: "service_account",
    project_id: "bitbucket-webhook-handler-demo",
    private_key_id: "a1b1775b1c6a78448f1e6f70044cfafdf7916f94",
    private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8KaZOtbeGP0cY\nhc8kk0JTBUpWMwKaM+E2mSsMYu+aGtRd3uQraWYZx4zp6plEPsPEFAqnnB7HvaVE\n+N+8TqU/A0N4T6nhcSZ12YWngubNj4EjBkn0t7FYBzr6xrALw6RyJ9tGMnq1OyTQ\nxSY7QBaS139A4/rVuyYFep7bbsUI8zNK2e+sl1+9nkmIE2cbgx6FTJglYOli7ib4\npqEMGsEDpUQR1PL4wqPfCDjFJ2J7OIJs4L5wliE1rOs7OmSI4EZKCYAGTkbNvEJA\nJ5ketl45Hr/pt+xQz/dsFrAuK9qny6oK2LPvYV6YPEVnxhiQU1zUYo4Xhx+dy27o\n5vmqhBwPAgMBAAECggEADplZVsm2QRC/dpF0kR0UgXYrc9pbrSoxovepsDmBkfPb\nSU3mEdDeLp7dzze4B47/x8Ku/EfagtszK6b2+QMjGBYBPKBLCSZVz8FTo5ETpkb9\nmSw/kwtTk7BlQkLQiEEi4lvhoVCBASG4dAhFNJtUL7V6S/HEVaPtHxy0nvLjumi+\nF8YXA5bwB4JIYBQjLbruiekAnr9MZfpr3q3n/D9nIREFSc909qA6d7ChVX4R43GZ\nuzIN6vljoim63N53XQmVrCqaSU63UEyZgzzz+b79KJnuAG9oqKt/wFU/jLFORkXw\nvslWnH/IrK8Ews+j8VOFbbFADOH4V9ob1nA1ftYM9QKBgQDmRRbvdU39F8wsNaqd\ncL7zS4VNrvPlbgQAwgcIF2vDHaqWZ5GWWvW90x9047WD6fhWnLcMCa1eHLogfsx8\nIHbWhJ5tWXn/EpDGQtF5yEf1GLik4+extPN+rqJXKS52ILF+36vVWpV7fY6qgZDk\nhpe/IiW9vg2JPkCFJwIbXeKzPQKBgQDRMBOZLsFnW5ZCW7S0ZOw2urH57ikgDXEv\nMe1oMk/8sQzChEpA9skK3sTxYxcPWg4xsnPvN+ESD+017PimL6hxM6c/OAkFDB8z\nd1wNbf6yuByJaaUttTxmsO9oPDwd58fPc82jGxlgmeRq632fDt62AspMa4gCLCrL\nHp7ILbDROwKBgQChwF6ADtKdup29YGVc+tnnZWFaVE8XFtTRA3qVAH6+LJSr2ky2\nZWbB1Q//uATFiRDdJnCekB2sQlmsgeV6PAO+ZKI1Belgd9YirsUe2sVRMfBiQ4V5\nmzaAAoQe3dq5N/X2vX+i+2KNwID63NC+9pyZso74Xgx8H7KK1f/w4V5hsQKBgQDC\nJcW6wRs9K1Ks6eIwHw7gyKuQFEtU9UTcEZGOyEtWcpguHIux+ZmjnhfZFSd81w8f\nbsmM9ybMFb4J85Le4pKJ5e/Oi9pLNfHrWVc1G6ZtBtVtb4CfiHqzsHmyG12MP+dB\nkfAD9o26C3plBYUEz89BzBsnjBGiOo3JEPU7QrS9qwKBgQDVvxRK2mg3idVywR3j\nq8PLQ0PHW5ndoqAi+JbotNHl89XbJYumn2ksxFR7D8+8qtYvH7xS7eqhiC2IQ4Cj\nTWVaYvQOE9mHoRY+V3M1nzy6Dr8324icXWbjwIpsSma7XsubIfv5Y+g6o9c4bUvU\nrxTqsUonn9fnjfEqIRXKJ8Jk/Q==\n-----END PRIVATE KEY-----\n",
    client_email:
        "firebase-adminsdk-910pu@bitbucket-webhook-handler-demo.iam.gserviceaccount.com",
    client_id: "105820631621906745524",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-910pu%40bitbucket-webhook-handler-demo.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(config),
});

module.exports = admin.firestore();
