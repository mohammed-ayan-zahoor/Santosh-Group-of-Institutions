import os
import urllib.request
from PIL import Image
import io

os.makedirs('public/images', exist_ok=True)

# Map of output filename -> Unsplash high-res photo URL
ASSETS = {
    "library-students.jpg": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85",
    "bca-computer-lab.jpg": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
    "classroom-students.jpg": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85",
    "auditorium-event.jpg": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
    "college-bus.jpg": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
    "sports-volleyball.jpg": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=85",
    "bbm-students.jpg": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    "bcom-students.jpg": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
    "ba-students.jpg": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    "ded-teachers.jpg": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
    "ded-classroom-session.jpg": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85",
    "puc-students-library.jpg": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=85",
    "puc-students-reading.jpg": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=85",
    "students-group-uniform.jpg": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
    "student-portrait.jpg": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
    "students-walking.jpg": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85",
    "faculty-meeting.jpg": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85",
    "faculty-group.jpg": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
    "nss-camp-banner.jpg": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85",
}

def download_and_optimize(filename, url):
    out_path = os.path.join('public/images', filename)
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            im = Image.open(io.BytesIO(data)).convert('RGB')
            im.save(out_path, 'JPEG', quality=90, optimize=True)
            print(f"✓ Saved {filename}: {im.size[0]}x{im.size[1]} ({len(data)//1024} KB)")
    except Exception as e:
        print(f"✗ Failed {filename}: {e}")

if __name__ == '__main__':
    print(f"Starting download of {len(ASSETS)} high-resolution stock assets...")
    for fn, url in ASSETS.items():
        download_and_optimize(fn, url)
    print("Done!")
