export default function ProfilePicUpLoader() {
  $(document).ready(function () {
    const readURL = function (input) {
      function showUploadOption() {
        hideUploadOption();
        if (objFileInput.files[0]) {
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            $('#targetLayer').html(
              '<img src="' +
                e.target.result +
                '" width="200px" height="200px" class="upload-preview" />',
            );
            $('#targetLayer').css('opacity', '0.7');
            $('.icon-choose-image').css('opacity', '0.5');
          };
          fileReader.readAsDataURL(objFileInput.files[0]);
        }
      }
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('.profile-pic').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    $('.file-upload').on('change', function () {
      readURL(this);
    });

    $('.upload-button').on('click', function () {
      $('.file-upload').click();
    });
  });

  $('#imageUpload').change(function () {
    fasterPreview(this);
  });
  return (
    <div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <div id="profile-container">
        <image id="profileImage" src="http://lorempixel.com/100/100" />
      </div>
      <input
        id="imageUpload"
        type="file"
        name="profile_photo"
        placeholder="Photo"
        required=""
        capture
      />
    </div>
  );
}
