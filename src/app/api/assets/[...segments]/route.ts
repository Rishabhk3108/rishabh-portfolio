import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ segments: string[] }> }
) {
  const { segments } = await params;
  // Sanitize each segment to prevent path traversal
  const clean = segments.map(s => path.basename(s));
  const filePath = path.join(process.cwd(), 'assets', ...clean);

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase().slice(1);
    const mime =
      ext === 'webp' ? 'image/webp'
      : ext === 'png'  ? 'image/png'
      : 'image/jpeg';

    return new NextResponse(data, {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
