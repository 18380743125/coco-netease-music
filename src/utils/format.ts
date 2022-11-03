// 格式化数字
export function formatCount(count: number) {
  if (count > 100_000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

// 获取指定大小的图片
export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}x${height}`
}

export function formatTime(time: number) {
  // 1.将毫秒转成秒钟
  const timeSeconds = time / 1000

  // 2.获取分钟和秒钟
  // 100s => 01:40
  // 200s => 03:20
  // Math.floor(100 / 60) => 1
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60

  // 3.格式化时间
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')

  return `${formatMinute}:${formatSecond}`
}