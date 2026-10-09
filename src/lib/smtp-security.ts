export function smtpSecurity(port: number, plaintextTestUntil?: string, now = Date.now()) {
  const expiresAt = Date.parse(plaintextTestUntil ?? "");
  const plaintextTest = port === 587 && Number.isFinite(expiresAt) && now < expiresAt;
  return {
    secure: port === 465,
    requireTLS: !plaintextTest,
    ignoreTLS: plaintextTest,
  };
}
