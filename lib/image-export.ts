import html2canvas from "html2canvas"

export async function exportAsImage(
  element: HTMLElement,
  filename: string,
  format: "png" | "jpeg" = "png",
): Promise<void> {
  try {
    // Create a temporary wrapper with light background for export
    const wrapper = document.createElement("div")
    wrapper.style.background = "#ffffff"
    wrapper.style.padding = "20px"
    wrapper.style.display = "inline-block"

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement

    // Force light theme styles for export
    clonedElement.style.background = "#ffffff"
    clonedElement.style.color = "#000000"

    // Override any dark mode styles in the cloned element
    const darkElements = clonedElement.querySelectorAll("*")
    darkElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      // Remove dark mode classes and force light colors
      htmlEl.classList.remove("dark")
      if (htmlEl.style.backgroundColor && htmlEl.style.backgroundColor.includes("gray")) {
        htmlEl.style.backgroundColor = "#ffffff"
      }
      if (htmlEl.style.color && (htmlEl.style.color.includes("white") || htmlEl.style.color.includes("gray-100"))) {
        htmlEl.style.color = "#000000"
      }
    })

    wrapper.appendChild(clonedElement)
    document.body.appendChild(wrapper)

    // Configure html2canvas options for high quality and light background
    const canvas = await html2canvas(wrapper, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff", // Force white background
      width: wrapper.offsetWidth,
      height: wrapper.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
    })

    // Clean up the temporary wrapper
    document.body.removeChild(wrapper)

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        format === "jpeg" ? "image/jpeg" : "image/png",
        0.95, // High quality for JPEG
      )
    })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.${format}`

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting image:", error)
    throw new Error("Failed to export image")
  }
}
