import swaggerJSDoc from 'swagger-jsdoc'
import { NextResponse } from 'next/server'

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Retail Store API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000/api' }]
  },
  apis: ['./app/api/**/*.ts']
}
const swaggerSpec = swaggerJSDoc(options)

export async function GET() {
  return NextResponse.json(swaggerSpec)
}
