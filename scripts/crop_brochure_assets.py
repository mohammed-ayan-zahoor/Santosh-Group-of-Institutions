import os
from PIL import Image

os.makedirs('public/images', exist_ok=True)
brochure_dir = 'assets/images/brochure'

def crop_and_save(page_num, box_norm, out_name):
    # box_norm is (left_ratio, top_ratio, right_ratio, bottom_ratio)
    path = f"{brochure_dir}/page_{page_num:02d}.jpg"
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    im = Image.open(path)
    w, h = im.size
    box = (int(box_norm[0] * w), int(box_norm[1] * h), int(box_norm[2] * w), int(box_norm[3] * h))
    cropped = im.crop(box)
    out_path = f"public/images/{out_name}"
    cropped.save(out_path, quality=92)
    print(f"Saved {out_path} ({cropped.size[0]}x{cropped.size[1]})")

# Page 1: Official Seal Logo (top center circle)
crop_and_save(1, (0.64, 0.06, 0.81, 0.16), "sgi-seal.jpg")
# Page 1: Hero moon and balloon background
crop_and_save(1, (0.0, 0.35, 1.0, 0.95), "hero-moon.jpg")

# Page 2: Dr. Kalam portrait
crop_and_save(2, (0.24, 0.08, 0.95, 0.60), "dr-kalam.jpg")

# Page 4: Chairman Dr. Al Haji Abdul Sattar
crop_and_save(4, (0.22, 0.16, 0.76, 0.46), "chairman-abdul-sattar.jpg")

# Page 5: Secretary A. Adil Pasha
crop_and_save(5, (0.29, 0.19, 0.76, 0.48), "secretary-adil-pasha.jpg")

# Page 6: Students in pink/maroon uniform
crop_and_save(6, (0.47, 0.50, 0.85, 0.88), "students-group-uniform.jpg")

# Page 7: Students with globe
crop_and_save(7, (0.05, 0.44, 0.95, 0.92), "students-globe.jpg")

# Page 8: BBM students in blazers
crop_and_save(8, (0.05, 0.18, 0.45, 0.88), "bbm-students.jpg")

# Page 9: BCA students in computer lab
crop_and_save(9, (0.68, 0.38, 0.99, 0.92), "bca-computer-lab.jpg")

# Page 10: B.Com students at computers
crop_and_save(10, (0.48, 0.33, 0.88, 0.98), "bcom-students.jpg")

# Page 11: BA library discussion
crop_and_save(11, (0.47, 0.05, 0.95, 0.95), "ba-students.jpg")

# Page 12: D.Ed teachers in pink sarees
crop_and_save(12, (0.02, 0.08, 0.58, 0.42), "ded-teachers.jpg")
crop_and_save(12, (0.02, 0.74, 0.65, 0.98), "ded-classroom-session.jpg")

# Page 14: Fathima PUC students reading
crop_and_save(14, (0.28, 0.71, 0.61, 0.94), "puc-students-library.jpg")
crop_and_save(14, (0.28, 0.19, 0.48, 0.42), "puc-students-reading.jpg")

# Page 17: Faculty meeting & Full Faculty group
crop_and_save(17, (0.03, 0.09, 0.97, 0.44), "faculty-meeting.jpg")
crop_and_save(17, (0.03, 0.68, 0.97, 0.98), "faculty-group.jpg")

# Page 18: College building and classroom
crop_and_save(18, (0.36, 0.10, 0.98, 0.44), "campus-building-fathima.jpg")
crop_and_save(18, (0.36, 0.50, 0.98, 0.72), "classroom-students.jpg")

# Page 19: D.Ed College building, computer lab, library, auditorium, bus
crop_and_save(19, (0.02, 0.18, 0.52, 0.40), "campus-building-ded.jpg")
crop_and_save(19, (0.55, 0.10, 0.98, 0.31), "library-students.jpg")
crop_and_save(19, (0.55, 0.55, 0.98, 0.72), "auditorium-event.jpg")
crop_and_save(19, (0.55, 0.75, 0.98, 0.98), "college-bus.jpg")

# Page 20: NSS activities & sports volleyball
crop_and_save(20, (0.47, 0.16, 0.98, 0.93), "sports-volleyball.jpg")
crop_and_save(20, (0.03, 0.42, 0.48, 0.66), "nss-camp-banner.jpg")

# Page 22: Career Guidance & Placement
crop_and_save(22, (0.57, 0.05, 0.75, 0.46), "placement-group.jpg")

# Page 23: Dignitary visits
crop_and_save(23, (0.48, 0.32, 0.78, 0.82), "visit-education-minister.jpg")
crop_and_save(23, (0.16, 0.58, 0.34, 0.88), "visit-district-institute.jpg")

print("All brochure assets cropped and saved successfully!")
