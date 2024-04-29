const {createClient} = supabase

const supabase_url = "https://wwdaochdkrdaumjuwdxc.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZGFvY2hka3JkYXVtanV3ZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMTM2ODgsImV4cCI6MjAyNzY4OTY4OH0.jmeSsVO6kG3F5Uthc4JfjzCxpjHXAzzZyvW-3J9cMLo"

const connection = createClient(supabase_url, supabase_key) 
