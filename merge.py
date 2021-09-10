# -*- coding: utf-8 -*-
import PyPDF2, os
import sys


def merge(pdf_dir, out_file):
    pdf_files = []

    for fileName in os.listdir(pdf_dir):  
        if fileName.endswith('.pdf'):  
            pdf_files.append(fileName)  

    pdf_files = sorted(pdf_files, key=lambda x: os.path.getmtime(os.path.join(pdf_dir, x)))  # 文件排序
    for i in pdf_files:
        print(i)
    print("waiting...")
    pdf_writer = PyPDF2.PdfFileWriter()  

    for fileName in pdf_files:
        pdf_reader = PyPDF2.PdfFileReader(open(os.path.join(pdf_dir, fileName), 'rb')) 
        for pageNum in range(pdf_reader.numPages):
            pdf_writer.addPage(pdf_reader.getPage(pageNum))  

    pdf_output = open(out_file, 'wb')  
    pdf_writer.write(pdf_output)  
    pdf_output.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("please input pdf_dir and out_file")
        exit(0)
    merge(sys.argv[1], sys.argv[2])
    print("finish:", sys.argv[2])
