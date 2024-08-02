import { useEffect, useRef } from 'react'

// Danh sách các cung hoàng đạo với khoảng thời gian tương ứng
const zodiacSigns = [
  { sign: 'Bạch Dương', icon: '♈', start: '03-21', end: '04-19' },
  { sign: 'Kim Ngưu', icon: '♉', start: '04-20', end: '05-20' },
  { sign: 'Song Tử', icon: '♊', start: '05-21', end: '06-20' },
  { sign: 'Cự Giải', icon: '♋', start: '06-21', end: '07-22' },
  { sign: 'Sư Tử', icon: '♌', start: '07-23', end: '08-22' },
  { sign: 'Xử Nữ', icon: '♍', start: '08-23', end: '09-22' },
  { sign: 'Thiên Bình', icon: '♎', start: '09-23', end: '10-22' },
  { sign: 'Bọ Cạp', icon: '♏', start: '10-23', end: '11-21' },
  { sign: 'Nhân Mã', icon: '♐', start: '11-22', end: '12-21' },
  { sign: 'Ma Kết', icon: '♑', start: '12-22', end: '01-19' },
  { sign: 'Bảo Bình', icon: '♒', start: '01-20', end: '02-18' },
  { sign: 'Song Ngư', icon: '♓', start: '02-19', end: '03-20' }
]

function CountingLoveDays(dateLoveString) {
  const [day, month, year] = dateLoveString.split('-').map(Number) // Tách chuỗi và chuyển đổi thành số
  const dateLove = new Date(year, month - 1, day) // Tạo đối tượng Date (tháng tính từ 0)

  const date = new Date()
  // Chuyển đổi cả hai ngày sang UTC để tránh vấn đề về múi giờ
  const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  const dateLoveUTC = Date.UTC(dateLove.getFullYear(), dateLove.getMonth(), dateLove.getDate())
  const period = dateUTC - dateLoveUTC
  // Chuyển đổi miligiây thành giây
  const dateLoveSeconds = Math.floor(period / 1000)
  // Tính số ngày
  const dateLoveDays = Math.floor(dateLoveSeconds / (24 * 3600))
  return dateLoveDays
}


// Hàm xác định cung hoàng đạo và biểu tượng dựa trên ngày sinh
function getZodiacSign(date) {
  const [day, month] = date.split('-').map(Number)

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start.split('-').map(Number)
    const [endMonth, endDay] = zodiac.end.split('-').map(Number)

    const startDate = new Date(2024, startMonth - 1, startDay) // Sử dụng năm bất kỳ
    const endDate = new Date(2024, endMonth - 1, endDay) // Sử dụng năm bất kỳ
    const currentDate = new Date(2024, month - 1, day) // Sử dụng năm bất kỳ

    if ((currentDate >= startDate && currentDate <= endDate) || (startMonth === 12 && endMonth === 1 && (currentDate >= startDate || currentDate <= endDate))) {
      return zodiac.icon
    }
  }
  return ''
}

const user = {
  name1: 'Ngô Thành Lâm',
  name2: 'Võ Thị Na Vi',
  dateBirth1: '30-03-2004',
  dateBirth2: '09-02-2004',
  gender1: 'nam',
  gender2: 'nữ',
  dateLove: '05-03-2021'
}

const HeartCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const settings = {
      particles: {
        length: 500,
        duration: 2,
        velocity: 100,
        effect: -0.75,
        size: 30
      }
    }

    class Point {
      constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
      }

      clone() {
        return new Point(this.x, this.y)
      }

      length(length) {
        if (length === undefined) {
          return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        this.normalize()
        this.x *= length
        this.y *= length
        return this
      }

      normalize() {
        const length = this.length()
        this.x /= length
        this.y /= length
        return this
      }
    }

    class Particle {
      constructor() {
        this.position = new Point()
        this.velocity = new Point()
        this.acceleration = new Point()
        this.age = 0
      }

      initialize(x, y, dx, dy) {
        this.position.x = x
        this.position.y = y
        this.velocity.x = dx
        this.velocity.y = dy
        this.acceleration.x = dx * settings.particles.effect
        this.acceleration.y = dy * settings.particles.effect
        this.age = 0
      }

      update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime
        this.position.y += this.velocity.y * deltaTime
        this.velocity.x += this.acceleration.x * deltaTime
        this.velocity.y += this.acceleration.y * deltaTime
        this.age += deltaTime
      }

      draw(context, image) {
        function ease(t) {
          return (--t) * t * t + 1
        }
        const size = image.width * ease(this.age / settings.particles.duration)
        context.globalAlpha = 1 - this.age / settings.particles.duration
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size)
      }
    }

    class ParticlePool {
      constructor(length) {
        this.particles = Array.from({ length }, () => new Particle())
        this.firstActive = 0
        this.firstFree = 0
        this.duration = settings.particles.duration
      }

      add(x, y, dx, dy) {
        this.particles[this.firstFree].initialize(x, y, dx, dy)

        this.firstFree++
        if (this.firstFree === this.particles.length) this.firstFree = 0
        if (this.firstActive === this.firstFree) this.firstActive++
        if (this.firstActive === this.particles.length) this.firstActive = 0
      }

      update(deltaTime) {
        let i

        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime)
          }
        } else {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].update(deltaTime)
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime)
          }
        }

        while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
          this.firstActive++
          if (this.firstActive === this.particles.length) this.firstActive = 0
        }
      }

      draw(context, image) {
        let i

        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].draw(context, image)
          }
        } else {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].draw(context, image)
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].draw(context, image)
          }
        }
      }
    }

    function pointOnHeart(t) {
      return new Point(
        150 * Math.pow(Math.sin(t), 3),
        110 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      )
    }

    const createImage = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = settings.particles.size
      canvas.height = settings.particles.size

      function to(t) {
        const point = pointOnHeart(t)
        point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350
        point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350
        return point
      }

      context.beginPath()
      let t = -Math.PI
      let point = to(t)
      context.moveTo(point.x, point.y)
      while (t < Math.PI) {
        t += 0.01
        point = to(t)
        context.lineTo(point.x, point.y)
      }
      context.closePath()
      // Màu trái tim
      context.fillStyle = '#ea80b0'
      context.fill()

      const image = new Image()
      image.src = canvas.toDataURL()
      return image
    }

    const image = createImage()
    const particles = new ParticlePool(settings.particles.length)
    const particleRate = settings.particles.length / settings.particles.duration

    const avatar1 = new Image()
    const avatar2 = new Image()

    // Ảnh đại diện
    avatar1.src = 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/428612755_411073891393500_5432439734118428374_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=-wWhjurloj0Q7kNvgEspzEp&_nc_ht=scontent.fdad3-4.fna&oh=00_AYAQvWx5C0tLCWJC3mG4KEPI-ib9WyXAbkaLhY-HoHpw2g&oe=66AE4FB4' // Đường dẫn ảnh đại diện 1
    avatar2.src = 'https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/273019099_110471211545544_9219954687133581124_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF_jkCNko6F1pN2l5rb_l90UUfWl6IxHkFRR9aXojEeQSeCtj90Zrs6dEuRXXFlHkQf_k2r0sKgGm96SGbIz8LR&_nc_ohc=Z_Bh4WKOCG4Q7kNvgHP12WN&_nc_ht=scontent.fdad3-1.fna&gid=AEuR9603k9sLYyY9rqRVpzo&oh=00_AYClI1s_dmZWpnV9H8JH_kGqixz2GtDdqN-lk59S7xKMbw&oe=66AE648F' // Đường dẫn ảnh đại diện 2

    let time

    function render() {
      requestAnimationFrame(render)

      const newTime = new Date().getTime() / 1000
      const deltaTime = newTime - (time || newTime)
      time = newTime

      context.clearRect(0, 0, canvas.width, canvas.height)

      const amount = particleRate * deltaTime
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random())
        const dir = pos.clone().length(settings.particles.velocity)
        particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y)
      }

      particles.update(deltaTime)
      particles.draw(context, image)

      // Draw names on each side of the heart
      context.font = 'bold 20px "Roboto", sans-serif'
      context.fillStyle = '#C0C0C0'
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const leftX = canvas.width / 2 - 120
      const rightX = canvas.width / 2 + 120
      const y = canvas.height / 2 - 80

      function wrapText(text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ')
        let line = ''

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' '
          const testWidth = context.measureText(testLine).width

          if (testWidth > maxWidth) {
            context.fillText(line, x, y)
            line = words[n] + ' '
            y += lineHeight
          } else {
            line = testLine
          }
        }
        context.fillText(line, x, y)
      }

      // Tên người dùng
      wrapText(`${user.name1}`, leftX, y, 120, 30)
      wrapText(`${user.name2}`, rightX, y, 120, 30)
      wrapText('Đang yêu', canvas.width / 2, canvas.height / 2 - 10)
      wrapText('ngày', canvas.width / 2, canvas.height / 2 + 60)

      // Draw the center text
      context.font = 'bold 36px "Roboto", sans-serif'
      context.fillStyle = '#FF69B4'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(`${CountingLoveDays(user.dateLove)}`, canvas.width / 2, canvas.height / 2 + 30)

      // Draw avatars
      const avatarSize = 60 // Kích thước ảnh đại diện
      const borderWidth = 4 // Độ dày viền

      function drawAvatar(x, y, image) {
        context.beginPath()
        context.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
        context.clip()
        context.drawImage(image, x, y, avatarSize, avatarSize)
        context.restore()

        // Draw border
        context.lineWidth = borderWidth
        context.strokeStyle = '#FF69B4' // Màu của viền
        context.stroke()
      }

      if (avatar1.complete) {
        context.save()
        drawAvatar(canvas.width / 2 - 175, canvas.height / 2 + 140, avatar1)
        // Draw birthdate, gender symbol, and zodiac sign below the first avatar
        context.font = '16px "Roboto", sans-serif'
        context.fillStyle = '#C0C0C0'
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillText(`${user.dateBirth1}`, canvas.width / 2 - 170 + avatarSize / 2, canvas.height / 2 + 140 + avatarSize + 10)
        context.fillText(`${user.gender1 === 'Nam'? '♂' : '♀'} ${getZodiacSign(user.dateBirth1)}`, canvas.width / 2 - 180 + avatarSize / 2, canvas.height / 2 + 140 + avatarSize + 30)
      }

      if (avatar2.complete) {
        context.save()
        drawAvatar(canvas.width / 2 + 110, canvas.height / 2 + 140, avatar2)
        // Draw birthdate, gender symbol, and zodiac sign below the second avatar
        context.font = '16px "Roboto", sans-serif'
        context.fillStyle = '#C0C0C0'
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillText(`${user.dateBirth2}`, canvas.width / 2 + 110 + avatarSize / 2, canvas.height / 2 + 140 + avatarSize + 10)
        context.fillText(`${user.gender2 === 'Nam'? '♂' : '♀'} ${getZodiacSign(user.dateBirth2)}`, canvas.width / 2 + 110 + avatarSize / 2, canvas.height / 2 + 140 + avatarSize + 30)
      }
    }

    function onResize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', onResize)
    onResize()
    render()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  )
}

export default HeartCanvas
