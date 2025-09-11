export async function getDropboxAccessToken() {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.DROPBOX_REFRESH_TOKEN!,
    client_id: process.env.DROPBOX_APP_KEY!,
    client_secret: process.env.DROPBOX_APP_SECRET!
  });

  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Dropbox token error: ${data.error_description || data.error}`);
  return data.access_token;
} 