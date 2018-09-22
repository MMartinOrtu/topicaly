
export const showLoadingMessage = (element) => {
    element.innerHTML = '<div class="ux-message"><i class="fas fa-spinner fa-spin"></i>&nbsp;Loading...</div>';
}
// Show error message if articles does not load
export const showErrorMessage = (element) => {
    element.innerHTML = '<div class="ux-message"><i class="fas fa-exclamation-triangle"></i></br>Error retrieving data. Connection failed</div>';
}
// Show error message if there is no data
export const showNoDataMessage = (element) => {
    element.innerHTML = '<div class="ux-message">There is no data</div>';
}

export default {
    showLoadingMessage,
    showErrorMessage,
    showNoDataMessage
  };

