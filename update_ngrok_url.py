#!/usr/bin/env python3
"""
Script to update the ngrok URL in both the web app and API implementation
"""

import re
import sys

def update_url_in_file(file_path, old_url, new_url):
    """Update URL in a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace the URL
        updated_content = content.replace(old_url, new_url)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
            
        print(f"✅ Updated {file_path}")
        return True
    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def main():
    print("Update Ngrok URL Script")
    print("=" * 30)
    
    # Current URLs in the files
    current_web_url = "https://e419e9adc6c6.ngrok-free.app/diabetes_prediction"
    current_api_url = "https://e419e9adc6c6.ngrok-free.app/diabetes_prediction"
    
    print(f"Current web app URL: {current_web_url}")
    print(f"Current API URL: {current_api_url}")
    
    new_url = input("\nEnter your new ngrok URL (e.g., https://abcd1234.ngrok-free.app/diabetes_prediction): ").strip()
    
    if not new_url:
        print("No URL provided. Exiting.")
        return
    
    if not new_url.startswith("https://") or "ngrok-free.app" not in new_url:
        print("Warning: The URL doesn't look like a valid ngrok URL, but I'll update it anyway.")
    
    # Update both files
    files_updated = 0
    
    # Update index.html
    if update_url_in_file("index.html", current_web_url, new_url):
        files_updated += 1
    
    # Update api_implementation.py
    if update_url_in_file("api_implementation.py", current_api_url, new_url):
        files_updated += 1
    
    print(f"\n🎉 Updated {files_updated} files with the new URL.")
    print("You can now restart your web server and ngrok API.")

if __name__ == "__main__":
    main()