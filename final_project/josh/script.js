const {createClient} = supabase

const supabase_url = "https://rxjtxyuwkyirgqwgwwff.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4anR4eXV3a3lpcmdxd2d3d2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTQxMzUsImV4cCI6MjAyOTMzMDEzNX0.zkvK1Gt1eelpwCnxwUaggDB1s3wPuJdMmmTltAJMMCc"

const connection = createClient(supabase_url, supabase_key) 

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        $('#blah').attr('src', e.target.result).width(150).height(200);
      };
  
      reader.readAsDataURL(input.files[0]);
    }
    console.log("test");
}


async function Publish(){
  var isPublic = document.querySelector('#public').checked ? 1 : 0;
  var isDoorPickup = document.querySelector('#doorpickup').checked ? 1 : 0;
  var isDoorDropoff = document.querySelector('#doordropoff').checked ? 1 : 0;
  var isOfferDeliv = document.querySelector('#offerdeliv').checked ? 1 : 0;

  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const category = document.querySelector('#category_value').value; // assuming you have radio buttons for category
  const condition = document.querySelector('#condition_value').value; // assuming you have radio buttons for condition
  
  const description = document.querySelector('#description').value;
  const location = document.querySelector('#location_value').value;
  console.log(location);
  const tags = document.querySelector('#tag_value').value;

  const fileInput = document.querySelector('#upload_image');


    const file = fileInput.files[0];
    console.log(file);
  

    // Upload file to Supabase Storage
    
    const data = await connection.storage
        .from('Images')
        .upload(fileInput.name, file);


  const { error } = await connection.from('Product').insert({
      product_name: name,
      price: parseFloat(price),
      is_deleted: 0,
      category: category,
      condition: condition,
      location: location,
      tags: tags,
      description: description,
      public: isPublic,
      doorpickup: isDoorPickup,
      door_dropoff: isDoorDropoff,
      offer_deliv: isOfferDeliv
  });

  if (error) {
      console.error('Error inserting data:', error.message);
  } else {
      console.log('Data inserted successfully');
  }
}
async function signUpNewUser() {
  console.log(connection)
  
  const email_val = document.querySelector("#email_val").value
  const pass_val = document.querySelector("#psw_val").value
  
  const { error } = await connection.from('User').insert({
    email:email_val,
    password: pass_val
});
  }
async function signUpNewUser() {
  const email_val = document.querySelector("#email_val").value;
  const pass_val = document.querySelector("#psw_val").value;

  // Query the database to find a user with the entered email
  const { data, error } = await connection
    .from('User')
    .select('*')
    .eq('email', email_val)
    .single();

  if (error) {
    console.error('Error querying user:', error.message);
    return;
  }

  // Check if a user with the entered email exists
  if (!data) {
    console.log('User not found');
    return;
  }

  // Compare the entered password with the stored password
  if (data.password === pass_val) {
    console.log('Login successful');
    // Redirect or perform any action upon successful login
  } else {
    console.log('Incorrect password');
  }
}

async function signIn() {
  const email_val = document.querySelector("#email_val").value;
  const pass_val = document.querySelector("#psw_val").value;

  // Query the database to find a user with the entered email
  const { data, error } = await connection
    .from('User')
    .select('*')
    .eq('email', email_val)
    .single();

  if (error) {
    console.error('Error querying user:', error.message);
    return;
  }

  // Check if a user with the entered email exists
  if (!data) {
    console.log('User not found');
    return;
  }

  // Compare the entered password with the stored password
  if (data.password === pass_val) {
    console.log('Login successful');

    // Save user ID to session storage
    sessionStorage.setItem('userID', data.id);

    // Redirect to another page
    window.location.href = 'html.html';
  } else {
    console.log('Incorrect password');
  }
}
