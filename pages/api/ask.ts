import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question, subject, level } = req.body

  // Simulasi respons AI
  const answer = `Ini adalah jawaban untuk pertanyaan Anda tentang ${subject}: "${question}". 
                  Platform ini akan segera terintegrasi dengan Gemini, GPT-4, dan provider AI lainnya untuk memberikan jawaban yang lebih baik.`

  res.status(200).json({
    answer,
    subject,
    level,
    followUpQuestions: [
      'Apakah Anda ingin penjelasan lebih detail?',
      'Bisakah saya bantu dengan contoh soal?',
      'Apakah ada topik terkait yang ingin dipelajari?'
    ]
  })
}