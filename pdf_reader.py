import PyPDF2
import sys

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            
            print(f"PDF has {num_pages} pages")
            
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                text += page.extract_text() + "\n\n"
                
            return text
    except Exception as e:
        return f"Error extracting text: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 pdf_reader.py <pdf_file_path>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    extracted_text = extract_text_from_pdf(pdf_path)
    
    output_path = pdf_path.rsplit('.', 1)[0] + ".txt"
    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(extracted_text)
        
    print(f"Text extracted and saved to {output_path}")
