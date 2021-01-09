const handleFormikBlur = (event,handleBlur) => {
    let target = event.target;
    if (!target.value)
        return;
    return handleBlur(event);
};
export default handleFormikBlur;