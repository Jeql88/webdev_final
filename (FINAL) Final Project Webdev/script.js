const {createClient} = supabase

const supabase_url = "https://rxjtxyuwkyirgqwgwwff.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4anR4eXV3a3lpcmdxd2d3d2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTQxMzUsImV4cCI6MjAyOTMzMDEzNX0.zkvK1Gt1eelpwCnxwUaggDB1s3wPuJdMmmTltAJMMCc"

const connection = createClient(supabase_url, supabase_key) 


function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result).width(150).height(200).show();
      };

      reader.readAsDataURL(input.files[0]);
  }
}
  
async function Publish() {
  var isPublic = document.querySelector('#public').checked ? 1 : 0;
  var isDoorPickup = document.querySelector('#doorpickup').checked ? 1 : 0;
  var isDoorDropoff = document.querySelector('#doordropoff').checked ? 1 : 0;
  var isOfferDeliv = document.querySelector('#offerdeliv').checked ? 1 : 0;

  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const category = document.querySelector('#category_value').value;
  const condition = document.querySelector('#condition_value').value;
  const description = document.querySelector('#description').value;
  const location = document.querySelector('#location_value').value;
  const tags = document.querySelector('#tag_value').value;
  const fileInput = document.querySelector('#upload_image');
  const file = fileInput.files[0];

  let imageUrl = null;

  // Uploading Image to Supabase
  if (file) {
      const { data, error: uploadError } = await connection.storage
          .from('Images')
          .upload(`${Date.now()}_${file.name}`, file);

      if (uploadError) {
          console.error('Error uploading image:', uploadError.message);
          return;
      }

      const { data: publicData, error: publicUrlError } = connection.storage
          .from('Images')
          .getPublicUrl(data.path);

      if (publicUrlError) {
          console.error('Error getting public URL:', publicUrlError.message);
          return;
      }

      imageUrl = publicData.publicUrl;
  }

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
      offer_deliv: isOfferDeliv,
      image_url: imageUrl
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


//TEST

const productId = localStorage.getItem('idToPass');

if (!productId) {
  console.error('No product ID found in local storage');
} else {
  fetchProductDetails(productId);
}


// Function to fetch product data and populate the form
function fetchProductDetails(productId) {
  // Check if the current URL is "Update Item.html"
    connection
      .from('Product')
      .select('*')
      .eq('product_id', productId)
      .single()
      .then(response => {
        if (response.data) {
          document.getElementById('name').value = response.data.product_name;
          document.getElementById('price').value = response.data.price;
          document.getElementById('category_value').value = response.data.category;
          document.getElementById('condition_value').value = response.data.condition;
          document.getElementById('description').value = response.data.description;
          document.getElementById('location_value').value = response.data.location;
          document.getElementById('tag_value').value = response.data.tags;
          document.querySelector('#public').checked = response.data.public === 1;
          document.querySelector('#doorpickup').checked = response.data.doorpickup === 1;
          document.querySelector('#doordropoff').checked = response.data.door_dropoff === 1;
          document.querySelector('#offerdeliv').checked = response.data.offer_deliv === 1;
        } else {
          console.error('Error fetching product:', response.error);
        }
      });
}


// Function to handle product updates
function updateProductDetails() {
  const updatedName = document.getElementById('name').value;
  const updatedPrice = document.getElementById('price').value;
  const updatedCategory = document.getElementById('category_value').value;
  const updatedCondition = document.getElementById('condition_value').value;
  const updatedDescription = document.getElementById('description').value;
  const updatedLocation = document.getElementById('location_value').value;
  const updatedTags = document.getElementById('tag_value').value;
  var isPublic = document.querySelector('#public').checked ? 1 : 0;
  var isDoorPickup = document.querySelector('#doorpickup').checked ? 1 : 0;
  var isDoorDropoff = document.querySelector('#doordropoff').checked ? 1 : 0;
  var isOfferDeliv = document.querySelector('#offerdeliv').checked ? 1 : 0;

  connection
    .from('Product')
    .update({
      product_name: updatedName,
      price: updatedPrice,
      category: updatedCategory,
      condition: updatedCondition,
      description: updatedDescription,
      location: updatedLocation,
      tags: updatedTags,
      public: isPublic,
      doorpickup: isDoorPickup,
      door_dropoff: isDoorDropoff,
      offer_deliv: isOfferDeliv
    })
    .eq('product_id', productId)
    .then(response => {
      if (response.error) {
        console.error('Error updating product:', response.error);
      } else {
        console.log('Product updated successfully');
        window.location.href = 'My Items.html';
      }
    });
}

async function uploadImage(file) {
  const { data, error: uploadError } = await connection.storage
    .from('Images')
    .upload(`${Date.now()}_${file.name}`, file);

  if (uploadError) {
      console.error('Error uploading image:', uploadError.message);
      return null;
  }

  const { publicURL, error: publicUrlError } = connection.storage
    .from('Images')
    .getPublicUrl(data.path);

  if (publicUrlError) {
      console.error('Error getting public URL:', publicUrlError.message);
      return null;
  }

  return publicURL;
}
