

export default function Activity() {
  return(
    <>
    <div class="div mt-5 pt-5" >
      <input type="multi-select"/>
        <label for={"reference"} className="mb-2">Reference 
        <span class="text-danger">*</span>
        </label>
    </div>
    </>
  )


}
{/* <MultiSelect 
selectedValues={(value) =>
  setValues({ ...values, category_reference: value })
}
list={input.options} /> */}
