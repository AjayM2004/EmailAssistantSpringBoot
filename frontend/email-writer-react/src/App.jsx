import { useState } from 'react'
import axios from 'axios'
import { Container, Typography, Box, TextField, Select, FormControl, InputLabel, MenuItem, Button, CircularProgress } from '@mui/material'
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("Formal")
  const [generatedReply, setGeneratedReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const handleSubmit = async()=>{
      setLoading(true);
      setError('');
      try {
         console.log("Submitting email content:", emailContent, "with tone:", tone);
         const response = await axios.post("http://localhost:8080/api/email/generate",{
          emailContent,
          tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      } catch (error) {
        setError("Failed to generate email reply. Please try again.");
        console.error(error);
      }
      finally{
        setLoading(false);
      }
  }
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Writer
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          label="Email Content"
          multiline
          fullWidth
          rows={6}
          sx={{ mb: 2 }}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            id="tone-select"
            value={tone || ""}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Formal">Formal</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button variant='contained' onClick={handleSubmit}
         disabled={!emailContent || loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
        {error &&
        (
          <Typography color='error' sx={{mb:2}}>
            {error}
          </Typography>
        ) }
        {generatedReply && (
          <Box sx={{mt:3}}>
            <Typography variant='h5' gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
            fullWidth
            multiline
            rows={6}
            value={generatedReply}
            inputProps={{ readOnly: true }}
            />
            <Button
            variant='outlined' sx={{mt:2}}
            onClick={()=>navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard
            </Button>
            </Box>
        )}
      </Box>
        
     
         </Container>
  )
}

export default App
