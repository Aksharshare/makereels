import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('=== DUMMY UPLOAD DEBUG ===');
    console.log('Dummy upload endpoint called - no actual file processing');

    // Parse form data to get the file info (but don't process it)
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file found in form data');
      return NextResponse.json({ 
        success: true, 
        message: 'Dummy upload: no file provided but continuing' 
      });
    }

    console.log('File info (not processed):', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Return success response without actually uploading
    return NextResponse.json({
      success: true,
      message: 'Dummy upload: file not actually processed - email capture only',
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        dummyPath: '/dummy/upload/path'
      }
    });

  } catch (error) {
    console.error('=== DUMMY UPLOAD ERROR ===');
    console.error('Error:', error);
    
    // Even if there's an error, return success to not break the flow
    return NextResponse.json({ 
      success: true,
      message: 'Dummy upload: error occurred but continuing for email capture'
    });
  }
} 