import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const primaryColor = styles.primaryColor || '#0F2A4A';
  const accentColor = styles.accentColor || '#1A6FC4';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 14;

  return StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: bodySize,
      color: '#1a1a2e',
      lineHeight: lineHeight,
    },
    header: {
      backgroundColor: primaryColor,
      paddingTop: `${marginMm}mm`,
      paddingBottom: '7mm',
      paddingLeft: '10mm',
      paddingRight: '10mm',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderBottomWidth: 4,
      borderBottomColor: accentColor,
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Helvetica-Bold',
      color: '#fff',
      marginBottom: 2,
      letterSpacing: -0.3,
    },
    headline: {
      fontSize: bodySize,
      color: 'rgba(255,255,255,0.7)',
      letterSpacing: 0.3,
    },
    headerRight: {
      alignItems: 'flex-end',
    },
    contact: {
      fontSize: bodySize,
      color: 'rgba(255,255,255,0.7)',
      marginBottom: 2,
    },
    body: {
      flexDirection: 'row',
      flex: 1,
    },
    leftColumn: {
      width: '72mm',
      backgroundColor: '#f8fafc',
      paddingTop: '7mm',
      paddingBottom: '7mm',
      paddingLeft: '8mm',
      paddingRight: '6mm',
      borderRightWidth: 1,
      borderRightColor: '#e2e8f0',
    },
    rightColumn: {
      flex: 1,
      paddingTop: '7mm',
      paddingBottom: '7mm',
      paddingLeft: '7mm',
      paddingRight: '8mm',
    },
    section: {
      marginBottom: sectionSpacing,
    },
    sectionTitle: {
      fontSize: headingSize,
      fontFamily: 'Helvetica-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      color: accentColor,
      marginBottom: 5,
      paddingBottom: 3,
      borderBottomWidth: 1.5,
      borderBottomColor: accentColor,
    },
    bodyText: {
      color: '#374151',
    },
    skillItem: {
      marginBottom: 6,
    },
    skillCat: {
      fontFamily: 'Helvetica-Bold',
      color: primaryColor,
      marginBottom: 1,
    },
    skillVal: {
      color: '#6b7280',
    },
    eduItem: {
      marginBottom: 7,
    },
    eduInst: {
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    eduDeg: {
      color: '#374151',
      marginTop: 1,
    },
    eduPeriod: {
      color: '#9ca3af',
      marginTop: 1,
    },
    expItem: {
      marginBottom: 8,
    },
    expRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    company: {
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    period: {
      color: '#9ca3af',
    },
    jobTitle: {
      fontFamily: 'Helvetica-Bold',
      color: accentColor,
      marginTop: 1,
      marginBottom: 3,
    },
    bullets: {
      paddingLeft: 13,
      marginTop: 2,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 10,
    },
    bulletText: {
      flex: 1,
      color: '#374151',
    },
    subheadingText: {
      fontFamily: 'Helvetica-Bold',
      marginTop: 2,
      marginBottom: 1,
      color: '#374151',
    }
  });
};

interface ModernPdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function ModernPdf({ data, styles }: ModernPdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.name}>{pi.name || 'Your Name'}</Text>
            {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          </View>
          <View style={s.headerRight}>
            {['email', 'phone', 'location', 'linkedin', 'github', 'website']
              .filter(f => (pi as any)[f])
              .map(f => (
                <Text key={f} style={s.contact}>{(pi as any)[f]}</Text>
              ))}
          </View>
        </View>

        <View style={s.body}>
          <View style={s.leftColumn}>
            {data.skills.filter(sk => sk.visible).length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Skills</Text>
                {data.skills.filter(sk => sk.visible).map(sk => (
                  <View key={sk.id} style={s.skillItem}>
                    <Text style={s.skillCat}>{sk.category}</Text>
                    <Text style={s.skillVal}>{sk.items}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.education.filter(e => e.visible).length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Education</Text>
                {data.education.filter(e => e.visible).map(edu => (
                  <View key={edu.id} style={s.eduItem}>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduDeg}>{edu.degree}</Text>
                    <Text style={s.eduPeriod}>{edu.period}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {data.responsibilities.filter(r => r.visible).length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Responsibility</Text>
                {data.responsibilities.filter(r => r.visible).map(r => (
                  <View key={r.id} style={s.skillItem}>
                    <Text style={s.bodyText}>{r.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={s.rightColumn}>
            {pi.summary && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Summary</Text>
                <Text style={s.bodyText}>{pi.summary}</Text>
              </View>
            )}

            {data.experience.filter(e => e.visible).length > 0 && (
              <View style={s.section}>
                <Text style={s.sectionTitle}>Experience</Text>
                {data.experience.filter(e => e.visible).map(exp => (
                  <View key={exp.id} style={s.expItem}>
                    <View style={s.expRow}>
                      <Text style={s.company}>
                        {exp.company}
                        {exp.location && <Text style={s.period}> · {exp.location}</Text>}
                      </Text>
                      <Text style={s.period}>{exp.period}</Text>
                    </View>
                    {exp.title && <Text style={s.jobTitle}>{exp.title}</Text>}
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
                <Text style={s.sectionTitle}>Projects</Text>
                {data.projects.filter(p => p.visible).map(proj => (
                  <View key={proj.id} style={s.expItem}>
                    <View style={s.expRow}>
                      <Text style={s.company}>{proj.title}</Text>
                      {proj.subtitle && <Text style={s.period}>{proj.subtitle}</Text>}
                    </View>
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
          </View>
        </View>
      </Page>
    </Document>
  );
}
