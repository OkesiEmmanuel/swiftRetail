export async function predictSalesTrend(pastSales: {date:string, total:number}[]) {
  // Demo: simple moving average projection (client-side mock)
  const last = pastSales.slice(-7)
  const avg = last.reduce((s, r) => s + r.total, 0) / (last.length || 1)
  return {
    projectedNextWeek: Math.round(avg * 7),
    confidence: 0.7
  }
}
// In production, replace with actual AI model call
// e.g., using OpenAI or another service            
// Example:
// const response = await openai.chat.completions.create({
//   model: "gpt-4-turbo",
//   messages: [...],
// });
// return response.choices[0].message.content
