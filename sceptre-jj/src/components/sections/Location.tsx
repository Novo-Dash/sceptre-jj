const mapsEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.5!2d-122.3255!3d37.5630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzQ2LjgiTiAxMjLCsDE5JzMxLjgiVw!5e0!3m2!1sen!2sus!4v1713800000000'

export function Location() {
  return (
    <div aria-label="Sceptre Jiu-Jitsu on Google Maps">
      <iframe
        src={mapsEmbed}
        width="100%"
        height="480"
        style={{ border: 0, display: 'block', aspectRatio: '16 / 9' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sceptre Jiu-Jitsu location on Google Maps"
      />
    </div>
  )
}
