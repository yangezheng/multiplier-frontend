import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post("https://multiplier-backend.onrender.com/api/calculate", {
        input: parseFloat(input),
      })
      setResult(res.data.result)
    } catch (err) {
      console.error(err)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Multiplier</h1>
        <Input
          type="number"
          placeholder="Enter a number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Calculating..." : "Submit"}
        </Button>
        {result !== null && (
          <CardContent>
            <p className="text-lg">Result: <strong>{result}</strong></p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default App
