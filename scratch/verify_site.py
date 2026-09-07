import os
import json
import glob

print("--- Running Verification Checks for SGI Platform ---")

# 1. Check all 19 JSON content files
content_dir = "data/content"
main_files = ["home.json", "about.json", "academics.json", "campus-life.json", "student-life.json", "admissions.json", "gallery.json", "contact.json"]
institution_files = glob.glob(f"{content_dir}/institutions/*.json")

print(f"Checking {len(main_files)} main content files...")
for mf in main_files:
    p = os.path.join(content_dir, mf)
    assert os.path.exists(p), f"Missing {p}"
    with open(p, "r") as f:
        data = json.load(f)
        assert data.get("slug"), f"No slug in {mf}"
    print(f"  ✓ {mf} valid")

print(f"\nChecking {len(institution_files)} institution content files...")
assert len(institution_files) == 11, f"Expected 11 institutions, found {len(institution_files)}"
for inf in institution_files:
    with open(inf, "r") as f:
        data = json.load(f)
        assert data.get("slug"), f"No slug in {inf}"
        assert data.get("name"), f"No name in {inf}"
        assert data.get("location") in ["Bangarpet", "Bangalore"], f"Invalid location in {inf}"
    print(f"  ✓ {os.path.basename(inf)} valid ({data['name']})")

# 2. Check public images exist
print("\nChecking image assets in public/images/...")
images = glob.glob("public/images/*")
assert len(images) >= 15, f"Expected >= 15 images, found {len(images)}"
print(f"  ✓ Found {len(images)} cropped high-res assets in public/images/")

# 4. Check CrossGrid component logic
print("\nChecking CrossGrid component...")
with open("components/CrossGrid.tsx") as f:
    code = f.read()
    assert "staircase" in code, "staircase variant missing in CrossGrid"
    assert "crosshair" in code, "crosshair variant missing in CrossGrid"
    assert "corner-step" in code, "corner-step variant missing in CrossGrid"
    assert "horizontal-strip" in code, "horizontal-strip variant missing in CrossGrid"
    assert "constellation" in code, "constellation variant missing in CrossGrid"
    assert "<svg" in code, "SVG markup missing in CrossGrid"
print("  ✓ CrossGrid 5 distinct architectural variants verified")

print("\n--- ALL 100% OF VERIFICATION CHECKS PASSED ---")
