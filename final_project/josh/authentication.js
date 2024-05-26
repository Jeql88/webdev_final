

const {createClient} = supabase

const supabase_url = "https://wwdaochdkrdaumjuwdxc.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZGFvY2hka3JkYXVtanV3ZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMTM2ODgsImV4cCI6MjAyNzY4OTY4OH0.jmeSsVO6kG3F5Uthc4JfjzCxpjHXAzzZyvW-3J9cMLo"

const connection = createClient(supabase_url, supabase_key) 


async function signUpNewUser() {
  console.log(connection)
  
  const email_val = document.querySelector("#email_val").value
  const pass_val = document.querySelector("#psw_val").value
  
  const { error } = await connection.from('User').insert({
    email:email_val,
    password: pass_val
});
  }

  
  