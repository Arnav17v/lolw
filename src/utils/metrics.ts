// Metrics utility for Graphite integration
export class MetricsCollector {
  private static instance: MetricsCollector
  private graphiteHost: string
  private graphitePort: number

  private constructor() {
    this.graphiteHost = process.env.GRAPHITE_HOST || 'localhost'
    this.graphitePort = parseInt(process.env.GRAPHITE_PORT || '2003')
  }

  public static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector()
    }
    return MetricsCollector.instance
  }

  public increment(metric: string, value: number = 1): void {
    this.sendMetric(metric, value, 'c')
  }

  public gauge(metric: string, value: number): void {
    this.sendMetric(metric, value, 'g')
  }

  public timing(metric: string, value: number): void {
    this.sendMetric(metric, value, 'ms')
  }

  private sendMetric(metric: string, value: number, type: string): void {
    const timestamp = Math.floor(Date.now() / 1000)
    const message = `ecommerce.${metric} ${value} ${timestamp}\n`
    
    // In a real implementation, you would send this to Graphite
    // For now, we'll just log it
    if (process.env.NODE_ENV === 'development') {
      console.log(`[METRIC] ${message.trim()}`)
    }
  }

  public recordRequestTime(path: string, duration: number): void {
    this.timing(`requests.${path.replace(/\//g, '.')}`, duration)
  }

  public recordError(path: string): void {
    this.increment(`errors.${path.replace(/\//g, '.')}`)
  }

  public recordMemoryUsage(usage: number): void {
    this.gauge('memory.usage', usage)
  }

  public recordCPUUsage(usage: number): void {
    this.gauge('cpu.usage', usage)
  }
}

export const metrics = MetricsCollector.getInstance() 