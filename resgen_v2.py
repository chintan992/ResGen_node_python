from gensim.summarization import summarize
import sys
import pdfx
filename = sys.argv[1]
dir = "./public/uploads/"
new_fname = dir+filename
#raw = parser.from_file("keya1.pdf")
pdf = pdfx.PDFx(new_fname)
text = pdf.get_text()
#text = raw['content']
print(summarize(text))
