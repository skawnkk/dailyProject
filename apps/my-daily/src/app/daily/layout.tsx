import Header from './Header'

export default function DailyPageLayout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <Header />
      <div className={`p-10`}>{children}</div>
    </section>
  )
}
