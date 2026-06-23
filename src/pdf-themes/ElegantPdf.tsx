import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const primaryColor = styles.primaryColor || '#0F2A4A';
  const accentColor = styles.accentColor || '#555';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 14;

  return StyleSheet.create({
    page: {
      padding: `${marginMm}mm 18mm`,
      backgroundColor: '#fff',
      fontFamily: 'Times-Roman',
      fontSize: bodySize,
      color: '#1c1c1c',
      lineHeight: lineHeight,
    },
    header: {
      textAlign: 'center',
      marginBottom: 18,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Times-Roman',
      color: primaryColor,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 3,
      lineHeight: 1.15,
    },
    headline: {
      fontSize: bodySize,
      fontFamily: 'Times-Italic',
      color: accentColor,
      marginBottom: 6,
      lineHeight: 1.2,
    },
    contactsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 2,
    },
    contactItemWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactItemText: {
      color: '#666',
      fontFamily: 'Helvetica',
      letterSpacing: 0.5,
    },
    section: {
      marginBottom: sectionSpacing,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    sectionTitleLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#eaeaea',
    },
    sectionTitle: {
      fontSize: headingSize,
      fontFamily: 'Times-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      color: primaryColor,
      marginHorizontal: 12,
    },
    summary: {
      color: '#333',
      textAlign: 'justify',
    },
    expItem: {
      marginBottom: 10,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 1.5,
    },
    company: {
      fontFamily: 'Times-Bold',
      color: primaryColor,
    },
    period: {
      fontFamily: 'Helvetica',
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: bodySize - 1,
    },
    expSub: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    jobTitle: {
      fontFamily: 'Times-Italic',
      color: accentColor,
    },
    location: {
      color: '#777',
      fontFamily: 'Times-Roman',
    },
    bullets: {
      paddingLeft: 16,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    bulletPoint: {
      width: 10,
      color: '#333',
    },
    bulletText: {
      flex: 1,
      color: '#333',
    },
    subheadingText: {
      fontFamily: 'Times-Bold',
      marginTop: 2,
      marginBottom: 1,
      color: '#333',
    },
    skillsGrid: {
      flexDirection: 'column',
      gap: 4.5,
    },
    skillRow: {
      flexDirection: 'row',
    },
    skillCat: {
      fontFamily: 'Times-Bold',
      color: primaryColor,
      width: '55mm',
    },
    skillItems: {
      flex: 1,
      color: '#333',
    }
  });
};

interface ElegantPdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function ElegantPdf({ data, styles }: ElegantPdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{pi.name || 'Your Name'}</Text>
          {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          <View style={s.contactsContainer}>
            {['phone', 'email', 'linkedin', 'github', 'website', 'location']
              .filter(f => (pi as any)[f])
              .map((f, i, arr) => (
                <View key={f} style={s.contactItemWrap}>
                  <Text style={s.contactItemText}>{(pi as any)[f]}</Text>
                  {i < arr.length - 1 && <Text style={s.contactItemText}>{'  ·  '}</Text>}
                </View>
              ))}
          </View>
        </View>

        {pi.summary && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Summary</Text>
              <View style={s.sectionTitleLine} />
            </View>
            <Text style={s.summary}>{pi.summary}</Text>
          </View>
        )}

        {data.experience.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Experience</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.experience.filter(e => e.visible).map(exp => (
              <View key={exp.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.company}>{exp.company}</Text>
                  <Text style={s.period}>{exp.period}</Text>
                </View>
                <View style={s.expSub}>
                  <Text style={s.jobTitle}>{exp.title}</Text>
                  {exp.location && <Text style={s.location}> — {exp.location}</Text>}
                </View>
                <View style={s.bullets}>
                  {exp.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.projects.filter(p => p.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Projects</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.projects.filter(p => p.visible).map(proj => (
              <View key={proj.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.company}>{proj.title}</Text>
                </View>
                {proj.subtitle && (
                  <View style={s.expSub}>
                    <Text style={s.location}>{proj.subtitle}</Text>
                  </View>
                )}
                <View style={s.bullets}>
                  {proj.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills.filter(sk => sk.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Skills</Text>
              <View style={s.sectionTitleLine} />
            </View>
            <View style={s.skillsGrid}>
              {data.skills.filter(sk => sk.visible).map(sk => (
                <View key={sk.id} style={s.skillRow}>
                  <Text style={s.skillCat}>{sk.category}:</Text>
                  <Text style={s.skillItems}>{sk.items}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Education</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.education.filter(e => e.visible).map(edu => (
              <View key={edu.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.company}>{edu.institution}</Text>
                  <Text style={s.period}>{edu.period}</Text>
                </View>
                <View style={s.expSub}>
                  <Text style={s.jobTitle}>{edu.degree}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {data.responsibilities.filter(r => r.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <View style={s.sectionTitleLine} />
              <Text style={s.sectionTitle}>Responsibility</Text>
              <View style={s.sectionTitleLine} />
            </View>
            <View style={s.bullets}>
              {data.responsibilities.filter(r => r.visible).map(r => (
                <View key={r.id} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{r.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
